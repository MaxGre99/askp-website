import { NextResponse } from 'next/server';

import { prisma } from '@/shared/lib/prisma';

export const GET = async (
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ userId: string }>;
	},
) => {
	const { userId } = await params;
	try {
		const profile = await prisma.profile.findUnique({ where: { userId } });
		return NextResponse.json(profile);
	} catch (err) {
		console.error('GET_PROFILE_BY_USER_ID_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_profile' },
			{ status: 500 },
		);
	}
};
