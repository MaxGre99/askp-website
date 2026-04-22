import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
	try {
		await getAuthUser('ADMIN');

		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				role: true,
				status: true,
				createdAt: true,
				membershipLevel: true,
			},
			orderBy: { createdAt: 'desc' },
		});
		return NextResponse.json(users);
	} catch (err) {
		return handleRouteError(err, 'GET_ALL_USERS_ERROR');
	}
};
