import { NextResponse } from 'next/server';

import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
	try {
		const profiles = await prisma.profile.findMany({
			orderBy: { createdAt: 'desc' },
			take: 10,
		});

		return NextResponse.json(profiles);
	} catch (err) {
		console.error('GET_PROFILES_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_profiles_list' },
			{ status: 500 },
		);
	}
};
