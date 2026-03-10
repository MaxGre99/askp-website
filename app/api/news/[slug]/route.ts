import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { deleteS3File } from '@/shared/lib/deleteS3File';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { prisma } from '@/shared/lib/prisma';
import { slugify } from '@/shared/lib/slugify';

const MINIO_PUBLIC_URL =
	process.env.MINIO_PUBLIC_URL ?? 'http://localhost:9000';

export const GET = async (
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ slug: string }>;
	},
) => {
	const { slug } = await params;
	try {
		const news = await prisma.news.findUnique({ where: { slug } });
		return NextResponse.json(news);
	} catch (err) {
		console.error('GET_NEWS_BY_SLUG_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_news' },
			{ status: 500 },
		);
	}
};

export const PATCH = async (
	req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	const { slug } = await params;
	try {
		const body = await req.json();
		const updated = await prisma.news.update({
			where: { slug },
			data: { ...body, slug: body.title ? slugify(body.title) : undefined },
		});
		return NextResponse.json(updated);
	} catch (err) {
		if (
			err instanceof Prisma.PrismaClientKnownRequestError &&
			err.code === 'P2002'
		) {
			return NextResponse.json(
				{ error: 'slug_already_exists' },
				{ status: 409 },
			);
		}
		console.error('UPDATE_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_update_news' },
			{ status: 500 },
		);
	}
};

export const DELETE = async (
	_req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	const { slug } = await params;
	try {
		const news = await prisma.news.findUnique({ where: { slug } });
		if (!news)
			return NextResponse.json({ error: 'not_found' }, { status: 404 });

		// Удаляем обложку
		if (news.image) {
			await deleteS3File(news.image, 'news-covers').catch(console.error);
		}

		// Удаляем картинки из контента
		const contentImageUrls = extractImageUrls(news.content);
		await Promise.allSettled(
			contentImageUrls
				.filter((url) => url.startsWith(MINIO_PUBLIC_URL))
				.map((url) => deleteS3File(url, 'news-images')),
		);

		await prisma.news.delete({ where: { slug } });

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('DELETE_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_delete_news' },
			{ status: 500 },
		);
	}
};
