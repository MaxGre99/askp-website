import { DeleteObjectCommand } from '@aws-sdk/client-s3';

import { s3 } from './s3';

export const deleteS3File = async (
	url: string,
	bucket: string,
): Promise<void> => {
	const prefix = `${process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL}/${bucket}/`;
	if (!url.startsWith(prefix)) return;
	const key = url.slice(prefix.length);
	await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
};
