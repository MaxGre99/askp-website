import { NextResponse } from 'next/server';

import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
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
