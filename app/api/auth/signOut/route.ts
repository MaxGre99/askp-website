import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ApiError } from '@/shared/api/types/auth';

export const POST = async () => {
	try {
		const res = NextResponse.json({ ok: true });
		res.cookies.set('askp-token', '', { httpOnly: true, path: '/', maxAge: 0 });
		return res;
	} catch (err: unknown) {
		console.error('SIGNOUT_ERROR:', err);
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
