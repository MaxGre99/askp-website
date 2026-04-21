// import { NextResponse } from 'next/server';

// import { PutObjectCommand } from '@aws-sdk/client-s3';

// import { getAuthUser } from '@/shared/lib/getAuthUser';
// import { s3 } from '@/shared/lib/s3';

// export const POST = async (req: Request) => {
// 	await getAuthUser('ADMIN');

// 	const formData = await req.formData();
// 	const file = formData.get('file') as File | null;
// 	if (!file) return NextResponse.json({ error: 'no_file' }, { status: 400 });

// 	const buffer = Buffer.from(await file.arrayBuffer());
// 	const fileName = file.name; // сохраняем оригинальное имя

// 	await s3.send(
// 		new PutObjectCommand({
// 			Bucket: 'documents',
// 			Key: fileName,
// 			Body: buffer,
// 			ContentType: 'application/pdf',
// 			CacheControl: 'public, max-age=31536000, immutable',
// 		}),
// 	);

// 	return NextResponse.json({
// 		url: `${process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL}/documents/${fileName}`,
// 	});
// };

export {};
