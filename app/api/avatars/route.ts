import { NextResponse } from 'next/server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
// import { Prisma } from '@prisma/client';
import sharp from 'sharp';

import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';
import { s3 } from '@/shared/lib/s3';

export const POST = async (req: Request) => {
	try {
		const authUser = await getAuthUser();

		const formData = await req.formData();
		const file = formData.get('file') as File | null;
		if (!file) throw new ApiError('file_not_provided', 400);
		if (!file.type.startsWith('image/'))
			throw new ApiError('invalid_mime_type', 400);

		const originalBuffer = Buffer.from(await file.arrayBuffer());
		const metadata = await sharp(originalBuffer).metadata();

		if (!metadata.format) throw new ApiError('invalid_image', 400);
		if (
			metadata.width &&
			metadata.height &&
			metadata.width * metadata.height > 25_000_000
		)
			throw new ApiError('image_too_large', 400);
		if (originalBuffer.byteLength > 3 * 1024 * 1024)
			throw new ApiError('file_too_large', 400);

		const processedBuffer = await sharp(originalBuffer)
			.resize(512, 512, { fit: 'cover' })
			.webp({ quality: 100 })
			.toBuffer();

		const fileName = `${authUser.id}.webp`;
		const bucket = 'avatars';

		await s3
			.send(
				new PutObjectCommand({
					Bucket: bucket,
					Key: fileName,
					Body: processedBuffer,
					ContentType: 'image/webp',
					CacheControl: 'public, max-age=31536000, immutable',
				}),
			)
			.catch((e) => {
				console.error('MINIO_ERROR:', e);
				throw new ApiError('upload_failed', 500);
			});

		const url = `${process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL}/${bucket}/${fileName}`;

		await prisma.profile.upsert({
			where: { userId: authUser.id },
			update: { avatarUrl: url },
			create: { userId: authUser.id, avatarUrl: url },
		});

		return NextResponse.json({ url });
	} catch (err) {
		return handleRouteError(err, 'UPLOAD_AVATAR_ERROR');
	}
};
