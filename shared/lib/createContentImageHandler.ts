import { NextResponse } from 'next/server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

import { ApiError } from '@/shared/api';

import { getAuthUser } from './getAuthUser';
import { handleRouteError } from './handleRouteError';
import { s3 } from './s3';

export const createContentImageHandler = (
	bucket: string,
	type: 'OWNER' | 'ADMIN' | 'USER' = 'USER',
) => {
	return async (req: Request) => {
		try {
			const user = await getAuthUser(type);
			const formData = await req.formData();
			const file = formData.get('file') as File | null;
			if (!file) throw new ApiError('file_not_provided', 400);
			if (!file.type.startsWith('image/'))
				throw new ApiError('invalid_mime_type', 400);

			const buffer = Buffer.from(await file.arrayBuffer());
			if (buffer.byteLength > 5 * 1024 * 1024)
				throw new ApiError('file_too_large', 400);

			const processed = await sharp(buffer)
				.resize(1024, 1024, { fit: 'inside' })
				.webp({ quality: 90 })
				.toBuffer();

			const fileName = `${user.id}/${Date.now()}-${file.name}.webp`;

			await s3.send(
				new PutObjectCommand({
					Bucket: bucket,
					Key: fileName,
					Body: processed,
					ContentType: 'image/webp',
					CacheControl: 'public, max-age=31536000, immutable',
				}),
			);

			return NextResponse.json({
				url: `${process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL}/${bucket}/${fileName}`,
			});
		} catch (err) {
			return handleRouteError(
				err,
				`CREATE_IMAGE_${bucket.toUpperCase()}_ERROR`,
			);
		}
	};
};
