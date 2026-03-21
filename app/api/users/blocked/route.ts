import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
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
};
