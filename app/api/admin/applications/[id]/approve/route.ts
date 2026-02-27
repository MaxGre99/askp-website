import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import jwt from 'jsonwebtoken';
import { ApiError } from '@/shared/api';

export const POST = async (
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id } = await params;

		// --- JWT проверка ---
		const cookie = req.headers.get('cookie');
		if (!cookie) throw new ApiError('unauthorized', 401);

		const match = cookie.match(/token=([^;]+)/);
		if (!match) throw new ApiError('unauthorized', 401);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let payload: any;
		try {
			payload = jwt.verify(match[1], process.env.JWT_SECRET!);
		} catch {
			throw new ApiError('invalid_token', 401);
		}

		const userId = payload.id;
		if (!userId) throw new ApiError('unauthorized', 401);

		await prisma.user.update({
			where: { id },
			data: {
				status: 'ACTIVE',
				approvedBy: userId,
				approvedAt: new Date(),
			},
		});

		return NextResponse.json({ ok: true });
	} catch (err: unknown) {
		console.error('APPROVE_USER_ERROR:', err);
		if (err instanceof ApiError) {
			return NextResponse.json({ error: err.message }, { status: err.status });
		}
		return NextResponse.json(
			{ error: 'internal_server_error' },
			{ status: 500 },
		);
	}
};
