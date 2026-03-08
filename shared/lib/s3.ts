import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
	region: 'us-east-1', // любая, для MinIO не критично
	endpoint: process.env.MINIO_PUBLIC_URL, // например http://localhost:9000
	credentials: {
		accessKeyId: process.env.MINIO_ACCESS_KEY!,
		secretAccessKey: process.env.MINIO_SECRET_KEY!,
	},
	forcePathStyle: true, // важно для MinIO
});
