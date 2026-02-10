import { NextResponse } from 'next/server';
import { s3 } from '@/shared/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { ApiError } from '@/shared/api/types/auth';
import jwt from 'jsonwebtoken';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 МБ
const ALLOWED_EXTS = ['png', 'jpg', 'jpeg'];

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

		const ext = (file.name.split('.').pop() || '').toLowerCase();
		if (!ALLOWED_EXTS.includes(ext))
			throw new ApiError('Invalid file type', 400);

		const buffer = Buffer.from(await file.arrayBuffer());
		if (buffer.byteLength > MAX_FILE_SIZE)
			throw new ApiError('File too large', 400);

		const fileName = `${userId}.${ext}`;
		const bucket = 'avatars';

		// --- Загружаем в MinIO ---
		try {
			await s3.send(
				new PutObjectCommand({
					Bucket: bucket,
					Key: fileName,
					Body: buffer,
					ContentType: file.type || `image/${ext}`,
				}),
			);
		} catch (e) {
			console.error('MINIO_ERROR:', e);
			throw new ApiError('Upload failed', 500);
		}

		const url = `${process.env.MINIO_PUBLIC_URL}/${bucket}/${fileName}`;
		return NextResponse.json({ url });
	} catch (err: unknown) {
		console.error('UPLOAD_AVATAR_ERROR:', err);
		if (err instanceof ApiError) {
			return NextResponse.json({ error: err.message }, { status: err.status });
		}
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
};
