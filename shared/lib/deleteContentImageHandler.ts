import { NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { deleteS3File } from '@/shared/lib/deleteS3File';

const MINIO_PUBLIC_URL =
	process.env.MINIO_PUBLIC_URL ?? 'http://localhost:9000';

export const deleteContentImageHandler = (bucket: string) => {
	return async (req: Request) => {
		try {
			const user = await getAuthUser();
			const { url } = await req.json();

			if (!url || typeof url !== 'string')
				throw new ApiError('url_not_provided', 400);

			const prefix = `${MINIO_PUBLIC_URL}/${bucket}/`;
			if (!url.startsWith(prefix)) throw new ApiError('invalid_url', 400);

			const key = url.slice(prefix.length);
			if (!key.startsWith(`${user.id}/`)) throw new ApiError('forbidden', 403);

			await deleteS3File(url, bucket); // ← вместо DeleteObjectCommand напрямую

			return NextResponse.json({ success: true });
		} catch (err) {
			if (err instanceof ApiError)
				return NextResponse.json(
					{ error: err.message },
					{ status: err.status },
				);
			return NextResponse.json(
				{ error: 'internal_server_error' },
				{ status: 500 },
			);
		}
	};
};
