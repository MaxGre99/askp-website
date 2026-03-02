import { NextResponse } from 'next/server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { s3 } from '@/shared/lib/s3';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 МБ
const ALLOWED_EXTS = ['png', 'jpg', 'jpeg'];

export const POST = async (req: Request) => {
	try {
		const authUser = await getAuthUser();

		// --- Получаем файл ---
		const formData = await req.formData();
		const file = formData.get('file') as File | null;
		if (!file) throw new ApiError('file_not_provided', 400);

		const ext = (file.name.split('.').pop() || '').toLowerCase();
		if (!ALLOWED_EXTS.includes(ext))
			throw new ApiError('invalid_file_type', 400);

		const originalBuffer = Buffer.from(await file.arrayBuffer());

		if (originalBuffer.byteLength > MAX_FILE_SIZE)
			throw new ApiError('file_too_large', 400);

		const pngBuffer = await sharp(originalBuffer)
			.resize(512, 512, { fit: 'cover' })
			.png()
			.toBuffer();

		const fileName = `${authUser.id}.png`;
		const bucket = 'avatars';

		// --- Загружаем в MinIO ---
		try {
			await s3.send(
				new PutObjectCommand({
					Bucket: bucket,
					Key: fileName,
					Body: pngBuffer,
					ContentType: 'image/png',
				}),
			);
		} catch (e) {
			console.error('MINIO_ERROR:', e);
			throw new ApiError('upload_failed', 500);
		}

		const url = `${process.env.MINIO_PUBLIC_URL}/${bucket}/${fileName}`;
		return NextResponse.json({ url });
	} catch (err: unknown) {
		console.error('UPLOAD_AVATAR_ERROR:', err);
		if (err instanceof ApiError) {
			return NextResponse.json({ error: err.message }, { status: err.status });
		}
		return NextResponse.json(
			{ error: 'internal_server_error' },
			{ status: 500 },
		);
	}
};
