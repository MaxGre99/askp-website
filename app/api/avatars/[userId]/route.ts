import { NextResponse } from 'next/server';

import { DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

import { s3 } from '@/shared/lib/s3';

const bucket = 'avatars';

export const GET = async (
	req: Request,
	{ params }: { params: Promise<{ userId: string }> },
) => {
	try {
		const { userId } = await params;
		const exts = ['png', 'jpg', 'jpeg'];

		for (const ext of exts) {
			const key = `${userId}.${ext}`;
			try {
				await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
				return NextResponse.json({
					url: `${process.env.MINIO_PUBLIC_URL}/${bucket}/${key}`,
				});
			} catch {}
		}

		// Если не найдено ни одного файла
		return NextResponse.json({ url: null });
	} catch (err) {
		console.error('GET_AVATAR_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_get_avatar' },
			{ status: 500 },
		);
	}
};

export const DELETE = async (
	req: Request,
	{ params }: { params: Promise<{ userId: string }> },
) => {
	try {
		const { userId } = await params;
		const exts = ['png', 'jpg', 'jpeg'];

		for (const ext of exts) {
			const key = `${userId}.${ext}`;
			try {
				await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
			} catch {}
		}

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('DELETE_AVATAR_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_delete_avatar' },
			{ status: 500 },
		);
	}
};
