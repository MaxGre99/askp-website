import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/shared/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
	// Нужно await, т.к. cookies() возвращает Promise в этой версии
	const cookieStore = await cookies(); // <- await тут

	const tokenCookie = cookieStore.get('token');
	const token = tokenCookie?.value;

	if (!token) {
		return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
	}

	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

		const user = await prisma.user.findUnique({
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

		return NextResponse.json(user);
	} catch {
		return NextResponse.json({ error: 'Неверный токен' }, { status: 401 });
	}
}
