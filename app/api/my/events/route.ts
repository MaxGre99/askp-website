import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export const GET = async (req: Request) => {
	const authUser = await getAuthUser('ADMIN');

	try {
		const url = new URL(req.url);
		const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
		const pageSize = Math.min(
			50,
			Math.max(1, Number(url.searchParams.get('pageSize') ?? 4)),
		);

		const where = {
			authorId: authUser.id,
		};

		const total = await prisma.event.count({ where });

		const events = await prisma.event.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * pageSize,
			take: pageSize,
		});

		return NextResponse.json({ events, total });
	} catch (err) {
		console.error('GET_USER_EVENTS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_user_events' },
			{ status: 500 },
		);
	}
};
