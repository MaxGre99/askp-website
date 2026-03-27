import { NextResponse } from 'next/server';

import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const GET = async (
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ userId: string }>;
	},
) => {
	try {
		const { userId } = await params;

		const profile = await prisma.profile.findUnique({ where: { userId } });

		return NextResponse.json(profile);
	} catch (err) {
		return handleRouteError(err, 'GET_PROFILE_BY_USER_ID_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_fetch_profile' },
		// 	{ status: 500 },
		// );
	}
};
