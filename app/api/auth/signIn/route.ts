import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/shared/lib/prisma';
import { Prisma } from '@prisma/client';
import { ApiError } from '@/shared/api/types/auth';

export const POST = async (req: Request) => {
	try {
		const { email, password, rememberMe } = await req.json();

		if (!email || !password)
			throw new ApiError('Email и пароль обязательны', 400);

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) throw new ApiError('Пользователь не найден', 401);

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) throw new ApiError('Неверный пароль', 401);

		if (user.status !== 'ACTIVE') {
			throw new ApiError(
				user.status === 'PENDING'
					? 'Аккаунт ещё не одобрен администратором'
					: 'Аккаунт недоступен',
				403,
			);
		}

		const tokenExpirySeconds = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24;

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role,
			},
			process.env.JWT_SECRET!,
			{ expiresIn: tokenExpirySeconds },
		);

		const res = NextResponse.json({ ok: true });
		res.cookies.set('askp-token', token, {
			httpOnly: true,
			path: '/',
			maxAge: tokenExpirySeconds,
			sameSite: 'strict',
		});

		return res;
	} catch (err: unknown) {
		console.error('SIGNIN_ERROR:', err);

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
