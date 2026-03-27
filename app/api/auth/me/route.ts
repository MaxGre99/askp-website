import { NextResponse } from 'next/server';

// import { Prisma } from '@prisma/client';
import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';
import { UserSchema } from '@/shared/schemas';

export const GET = async () => {
	try {
		const authUser = await getAuthUser();

		const userFromDb = await prisma.user.findUnique({
			where: { id: authUser.id },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				role: true,
			},
		});

		if (!userFromDb) throw new ApiError('user_not_found', 404);

		const user = UserSchema.parse(userFromDb);

		return NextResponse.json(user);
	} catch (err) {
		return handleRouteError(err, 'GET_USER_ERROR');
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
