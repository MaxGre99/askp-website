import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (req: Request) => {
	const { email, password, rememberMe } = await req.json();

	if (!email || !password) {
		return NextResponse.json(
			{ error: 'Email и пароль обязательны' },
			{ status: 400 },
		);
	}

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user)
		return NextResponse.json(
			{ error: 'Пользователь не найден' },
			{ status: 401 },
		);

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid)
		return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });

	// определяем срок жизни
	const tokenExpirySeconds = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24; // 1 неделя или 1 день

	const token = jwt.sign(
		{
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			photo: user.photo,
			role: user.role,
		},
		process.env.JWT_SECRET!,
		{ expiresIn: tokenExpirySeconds },
	);

	const res = NextResponse.json({ ok: true });
	res.cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		maxAge: tokenExpirySeconds,
	});

	return res;
};
