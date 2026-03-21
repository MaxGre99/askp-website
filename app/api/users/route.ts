import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
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
		},
		orderBy: { createdAt: 'desc' },
	});
	return NextResponse.json(users);
};
