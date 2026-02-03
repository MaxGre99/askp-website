import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/shared/lib/prisma';

export async function POST(req: Request) {
	const { email, password } = await req.json();
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

	// создаем JWT
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
		{ expiresIn: '1d' },
	);

	// ставим в HttpOnly куку
	const res = NextResponse.json({ ok: true });
	res.cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60 * 24, // 1 день
	});

	return res;
}
