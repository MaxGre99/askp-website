import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { handleRouteError } from '@/shared/lib/handleRouteError';
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

		const base: Prisma.ProfileWhereInput = {
			user: { status: 'ACTIVE' },
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
			select: {
				userId: true,
				avatarUrl: true,
				displayName: true,
				city: true,
				shortBio: true,
			},
		});

		return NextResponse.json({ profiles, total });
	} catch (err) {
		return handleRouteError(err, 'GET_PROFILES_ERROR');
	}
};
