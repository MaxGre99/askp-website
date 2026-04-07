import { NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';

import { deleteS3File } from './deleteS3File';
import { getAuthUser } from './getAuthUser';
import { handleRouteError } from './handleRouteError';

export const deleteContentImageHandler = (
	bucket: string,
	type: 'OWNER' | 'ADMIN' | 'USER' = 'USER',
) => {
	return async (req: Request) => {
		try {
			const user = await getAuthUser(type);
			const { url } = await req.json();

			if (!url || typeof url !== 'string')
				throw new ApiError('url_not_provided', 400);

			const prefix = `${process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL}/${bucket}/`;
			if (!url.startsWith(prefix)) throw new ApiError('invalid_url', 400);

			const key = url.slice(prefix.length);
			if (!key.startsWith(`${user.id}/`)) throw new ApiError('forbidden', 403);

			await deleteS3File(url, bucket); // вместо DeleteObjectCommand напрямую

			return NextResponse.json({ success: true });
		} catch (err) {
			return handleRouteError(
				err,
				`DELETE_IMAGE_${bucket.toUpperCase()}_ERROR`,
			);
		}
	};
};
