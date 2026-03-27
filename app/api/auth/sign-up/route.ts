import { NextResponse } from 'next/server';

// import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { ApiError } from '@/shared/api';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import {
	sendNewApplicationEmailToAdmin,
	sendRegistrationEmailToUser,
} from '@/shared/lib/mails';
import { prisma } from '@/shared/lib/prisma';

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

		await Promise.allSettled([
			sendRegistrationEmailToUser({
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			}),
			sendNewApplicationEmailToAdmin({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			}),
		]);

		return NextResponse.json(user, { status: 201 });
	} catch (err) {
		return handleRouteError(err, 'SIGNUP_ERROR');
		// if (err instanceof ApiError)
		// 	return NextResponse.json({ error: err.message }, { status: err.status });
		// if (err instanceof Prisma.PrismaClientKnownRequestError)
		// 	return NextResponse.json({ error: 'database_error' }, { status: 500 });
		// return NextResponse.json(
		// 	{ error: 'internal_server_error' },
		// 	{ status: 500 },
		// );
	}
};
