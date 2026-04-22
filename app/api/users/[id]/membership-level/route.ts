import { NextResponse } from 'next/server';

import { MEMBERSHIP_RANK } from '@/shared/custom-types';
import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id: userId } = await params;

		await getAuthUser('ADMIN');

		const { level } = await req.json();

		const user = await prisma.user.update({
			where: { id: userId },
			data: {
				membershipLevel: level,
				membershipRank: MEMBERSHIP_RANK[level as keyof typeof MEMBERSHIP_RANK],
			},
		});

		return NextResponse.json(user);
	} catch (err) {
		return handleRouteError(err, 'SET_MEMBERSHIP_LEVEL_ERROR');
	}
};
