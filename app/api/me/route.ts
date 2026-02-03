import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/shared/lib/prisma';
import { cookies } from 'next/headers';
import UserSchema from '@/shared/schemas/user.schema';

export const GET = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) {
		return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string;
		};

		const userFromDb = await prisma.user.findUnique({
			where: { id: payload.id },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				photo: true,
				role: true,
			},
		});

		if (!userFromDb) {
			return NextResponse.json(
				{ error: 'Пользователь не найден' },
				{ status: 404 },
			);
		}

		const user = UserSchema.parse(userFromDb);

		return NextResponse.json(user);
	} catch {
		return NextResponse.json({ error: 'Неверный токен' }, { status: 401 });
	}
};
