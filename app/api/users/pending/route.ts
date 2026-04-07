import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
	try {
		await getAuthUser('ADMIN');

		const users = await prisma.user.findMany({
			where: { status: 'PENDING' },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				createdAt: true,
				status: true,
			},
			orderBy: { createdAt: 'asc' },
		});

		return NextResponse.json(users);
	} catch (err) {
		return handleRouteError(err, 'GET_PENDING_USERS_ERROR');
	}
};
