import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/shared/lib/prisma';
import { Prisma } from '@prisma/client';
import { ApiError } from '@/shared/api/types/auth';

export const PATCH = async (req: Request) => {
	try {
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

		const { avatar } = await req.json();
		if (!avatar) throw new ApiError('Avatar url required', 400);

		const user = await prisma.user.update({
			where: { id: userId },
			data: { avatar },
		});

		return NextResponse.json({ user });
	} catch (err: unknown) {
		console.error('PATCH_USER_AVATAR_ERROR:', err);
		if (err instanceof ApiError)
			return NextResponse.json({ error: err.message }, { status: err.status });
		if (err instanceof Prisma.PrismaClientKnownRequestError)
			return NextResponse.json(
				{ error: 'Ошибка базы данных' },
				{ status: 500 },
			);
		return NextResponse.json(
			{ error: 'Внутренняя ошибка сервера' },
			{ status: 500 },
		);
	}
};
