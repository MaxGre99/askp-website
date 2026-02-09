import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
// import { Prisma } from '@prisma/client';
import { s3 } from '@/shared/lib/s3';
import { PutObjectCommand /* , GetObjectCommand */ } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
// import { prisma } from '@/shared/lib/prisma';
import { ApiError } from '@/shared/api/types/auth';

export const POST = async (req: Request) => {
	try {
		// --- JWT проверка ---
		const cookie = req.headers.get('cookie');
		if (!cookie) throw new ApiError('Unauthorized', 401);

		const match = cookie.match(/token=([^;]+)/);
		if (!match) throw new ApiError('Unauthorized', 401);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let payload: any;
		try {
			payload = jwt.verify(match[1], process.env.JWT_SECRET!);
		} catch {
			throw new ApiError('Invalid token', 401);
		}

		const userId = payload.id;
		if (!userId) throw new ApiError('Unauthorized', 401);

		// --- Получаем файл ---
		const formData = await req.formData();
		const file = formData.get('file') as File | null;
		if (!file) throw new ApiError('File not provided', 400);

		const fileName = `${crypto.randomUUID()}-${file.name}`;
		const bucket = 'avatars';
		const buffer = Buffer.from(await file.arrayBuffer());

		// --- Загружаем в MinIO ---
		try {
			await s3.send(
				new PutObjectCommand({
					Bucket: bucket,
					Key: fileName,
					Body: buffer,
					ContentType: file.type || 'image/jpeg',
				}),
			);
		} catch (e) {
			console.error('MINIO_ERROR:', e);
			throw new ApiError('Upload failed', 500);
		}

		// --- Генерируем presigned URL ---
		// const url = await getSignedUrl(
		// 	s3,
		// 	new GetObjectCommand({ Bucket: bucket, Key: fileName }),
		// 	{ expiresIn: 60 * 5 },
		// );

		const url = `http://localhost:9000/${bucket}/${fileName}`;

		// // --- Обновляем пользователя в БД ---
		// let user;
		// try {
		// 	user = await prisma.user.update({
		// 		where: { id: userId },
		// 		data: { avatar: url },
		// 	});
		// } catch (err) {
		// 	console.error('PRISMA_ERROR:', err);
		// 	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		// 		throw new ApiError('Ошибка базы данных', 500);
		// 	}
		// 	throw err;
		// }

		// return NextResponse.json({ user });
		return NextResponse.json({ url });
	} catch (err: unknown) {
		console.error('API_ERROR:', err);

		if (err instanceof ApiError) {
			return NextResponse.json({ error: err.message }, { status: err.status });
		}

		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
};
