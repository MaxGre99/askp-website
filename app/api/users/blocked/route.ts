import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
	try {
		await getAuthUser('ADMIN');

		const users = await prisma.user.findMany({
			where: { status: 'BLOCKED' },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				createdAt: true,
			},
			orderBy: { createdAt: 'asc' },
		});

		return NextResponse.json(users);
	} catch (err) {
		return handleRouteError(err, 'GET_BLOCKED_USERS_ERROR');
	}
};
