import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/shared/lib/prisma';
import { cookies } from 'next/headers';
import UserSchema from '@/shared/schemas/user.schema';
import { Prisma } from '@prisma/client';
import { ApiError } from '@/shared/api/types/auth';

export const GET = async () => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('askp-token')?.value;
		if (!token) throw new ApiError('Не авторизован', 401);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let payload: any;
		try {
			payload = jwt.verify(token, process.env.JWT_SECRET!);
		} catch {
			throw new ApiError('Неверный токен', 401);
		}

		const userFromDb = await prisma.user.findUnique({
			where: { id: payload.id },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				role: true,
			},
		});
		if (!userFromDb) throw new ApiError('Пользователь не найден', 404);

		const user = UserSchema.parse(userFromDb);

		return NextResponse.json(user);
	} catch (err: unknown) {
		console.error('GET_USER_ERROR:', err);
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
