import { NextResponse } from 'next/server';

import { DeleteObjectCommand } from '@aws-sdk/client-s3';

import { getAuthUser } from '@/shared/lib/getAuthUser';
import { guardOwner } from '@/shared/lib/guardOwner';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { extractImageUrls } from '@/shared/lib/helpers';
import { prisma } from '@/shared/lib/prisma';
import { s3 } from '@/shared/lib/s3';

const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!;

const parseS3Url = (url: string): { bucket: string; key: string } | null => {
	try {
		const withoutBase = url.replace(`${MINIO_PUBLIC_URL}/`, '');
		const slashIdx = withoutBase.indexOf('/');
		if (slashIdx === -1) return null;
		return {
			bucket: withoutBase.slice(0, slashIdx),
			key: withoutBase.slice(slashIdx + 1),
		};
	} catch {
		return null;
	}
};

/** Удаляет файл из S3, не бросает ошибку */
function deleteFromS3(url: string): Promise<void> {
	const parsed = parseS3Url(url);
	if (!parsed) return Promise.resolve();
	return s3
		.send(new DeleteObjectCommand({ Bucket: parsed.bucket, Key: parsed.key }))
		.then(() => undefined)
		.catch((e) => console.error(`Failed to delete S3 object [${url}]:`, e));
}

/** Фильтрует только наши MinIO URL */
function ownUrls(urls: (string | null | undefined)[]): string[] {
	return urls.filter(
		(url): url is string => !!url && url.startsWith(MINIO_PUBLIC_URL),
	);
}

export const DELETE = async (
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id: userId } = await params;

		await getAuthUser('ADMIN');
		await guardOwner(userId);

		// Один запрос — всё нужное по пользователю
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				role: true,
				profile: {
					select: { avatarUrl: true, fullBio: true },
				},
				news: {
					select: { image: true, content: true },
				},
				events: {
					select: { image: true, description: true },
				},
				articles: {
					select: { image: true, content: true },
				},
			},
		});

		if (!user) {
			return NextResponse.json({ error: 'user_not_found' }, { status: 404 });
		}

		if (user.role === 'OWNER') {
			return NextResponse.json(
				{ error: 'cannot_delete_owner' },
				{ status: 403 },
			);
		}

		// Собираем все URL для удаления из S3
		const urlsToDelete: string[] = [];

		// Профиль: аватарка + картинки из fullBio
		if (user.profile) {
			urlsToDelete.push(
				...ownUrls([user.profile.avatarUrl]),
				...ownUrls(extractImageUrls(user.profile.fullBio ?? '')),
			);
		}

		// Новости: превью + картинки из content
		for (const item of user.news) {
			urlsToDelete.push(
				...ownUrls([item.image]),
				...ownUrls(extractImageUrls(item.content)),
			);
		}

		// События: превью + картинки из description
		for (const item of user.events) {
			urlsToDelete.push(
				...ownUrls([item.image]),
				...ownUrls(extractImageUrls(item.description)),
			);
		}

		// Статьи: превью + картинки из content
		for (const item of user.articles) {
			urlsToDelete.push(
				...ownUrls([item.image]),
				...ownUrls(extractImageUrls(item.content)),
			);
		}

		// Дедупликация на случай одинаковых URL
		const uniqueUrls = [...new Set(urlsToDelete)];

		// Параллельно: чистим S3 и удаляем пользователя (каскад подчистит БД)
		await Promise.all([
			...uniqueUrls
				.filter((url) =>
					url.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!),
				)
				.map(deleteFromS3),
			prisma.user.delete({ where: { id: userId } }),
		]);

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'DELETE_USER_ERROR');
	}
};
