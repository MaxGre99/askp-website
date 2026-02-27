import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/shared/lib/prisma';
import { Prisma } from '@prisma/client';
import { ApiError } from '@/shared/api';

export const POST = async (req: Request) => {
	try {
		const { email, password, firstName, lastName } = await req.json();

		if (!email || !password || !firstName || !lastName)
			throw new ApiError('required_fields', 400);

		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) throw new ApiError('already_exists', 409);

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				firstName,
				lastName,
				role: 'USER',
				status: 'PENDING',
			},
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				status: true,
			},
		});

		return NextResponse.json(user, { status: 201 });
	} catch (err: unknown) {
		console.error('SIGNUP_ERROR:', err);
		if (err instanceof ApiError)
			return NextResponse.json({ error: err.message }, { status: err.status });
		if (err instanceof Prisma.PrismaClientKnownRequestError)
			return NextResponse.json({ error: 'database_error' }, { status: 500 });
		return NextResponse.json(
			{ error: 'internal_server_error' },
			{ status: 500 },
		);
	}
};
