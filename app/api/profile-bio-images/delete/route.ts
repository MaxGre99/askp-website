import { NextResponse } from 'next/server';

import { DeleteObjectCommand } from '@aws-sdk/client-s3';

import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { s3 } from '@/shared/lib/s3';

const BUCKET = 'profile-bio-images';

export const DELETE = async (req: Request) => {
	try {
		const user = await getAuthUser();

		const { url } = await req.json();
		if (!url || typeof url !== 'string')
			throw new ApiError('url_not_provided', 400);

		const prefix = `${process.env.MINIO_PUBLIC_URL}/${BUCKET}/`;
		if (!url.startsWith(prefix)) throw new ApiError('invalid_url', 400);

		const key = url.slice(prefix.length);

		// Защита: пользователь может удалять только свои файлы
		if (!key.startsWith(`${user.id}/`)) throw new ApiError('forbidden', 403);

		await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error(err);
		if (err instanceof ApiError)
			return NextResponse.json({ error: err.message }, { status: err.status });
		return NextResponse.json(
			{ error: 'internal_server_error' },
			{ status: 500 },
		);
	}
};
