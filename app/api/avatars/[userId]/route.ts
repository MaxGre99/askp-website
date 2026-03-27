import { NextResponse } from 'next/server';

import { handleRouteError } from '@/shared/lib/handleRouteError';
/* import {
	DeleteObjectCommand, HeadObjectCommand,
} from '@aws-sdk/client-s3'; */
import { prisma } from '@/shared/lib/prisma';
// import { s3 } from '@/shared/lib/s3';

// const bucket = 'avatars';

export const GET = async (
	_req: Request,
	{ params }: { params: Promise<{ userId: string }> },
) => {
	try {
		const { userId } = await params;

		const profile = await prisma.profile.findUnique({
			where: { userId },
			select: { avatarUrl: true },
		});

		return NextResponse.json({ url: profile?.avatarUrl ?? null });
	} catch (err) {
		return handleRouteError(err, 'GET_AVATAR_ERROR');
	}
};

// export const DELETE = async (
// 	req: Request,
// 	{ params }: { params: Promise<{ userId: string }> },
// ) => {
// 	try {
// 		const { userId } = await params;
// 		const exts = ['png', 'jpg', 'jpeg'];

// 		for (const ext of exts) {
// 			const key = `${userId}.${ext}`;
// 			try {
// 				await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
// 			} catch {}
// 		}

// 		return NextResponse.json({ ok: true });
// 	} catch (err) {
// 		console.error('DELETE_AVATAR_ERROR:', err);
// 		return NextResponse.json(
// 			{ error: 'failed_to_delete_avatar' },
// 			{ status: 500 },
// 		);
// 	}
// };
