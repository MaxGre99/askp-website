import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/shared/lib/prisma';

export async function POST(req: Request) {
	try {
		const { email, password, firstName, lastName, photo } = await req.json();

		if (!email || !password || !firstName || !lastName) {
			return NextResponse.json(
				{ message: 'Не заполнены обязательные поля!' },
				{ status: 400 },
			);
		}

		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return NextResponse.json(
				{ message: 'Пользователь уже существует' },
				{ status: 409 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				firstName,
				lastName,
				photo,
				role: 'USER',
			},
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				photo: true,
				role: true,
			},
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		console.error('REGISTER ERROR:', error);
		return NextResponse.json(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			{ message: 'Ошибка регистрации', details: (error as any).message },
			{ status: 500 },
		);
	}
}
