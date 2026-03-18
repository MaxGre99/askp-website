import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';

export const GET = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const query = url.searchParams.get('query') || '';
		const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
		const pageSize = Math.min(
			50,
			Math.max(1, Number(url.searchParams.get('pageSize') ?? 4)),
		);

		const base = {
			AND: [
				{ avatarUrl: { not: null } },
				{ displayName: { not: null } },
				{ displayName: { not: '' } },
				{ shortBio: { not: null } },
				{ shortBio: { not: '' } },
				{ city: { not: null } },
				{ city: { not: '' } },
			],
		};

		const where: Prisma.ProfileWhereInput = {
			...base,
			...(query && {
				displayName: { contains: query.trim(), mode: 'insensitive' },
			}),
		};

		const total = await prisma.profile.count({ where });
		const profiles = await prisma.profile.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * pageSize,
			take: pageSize,
		});

		return NextResponse.json({ profiles, total });
	} catch (err) {
		console.error('GET_PROFILES_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_profiles' },
			{ status: 500 },
		);
	}
};
