import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export const GET = async (req: Request) => {
	const authUser = await getAuthUser();

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

		const total = await prisma.news.count({ where });

		const news = await prisma.news.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * pageSize,
			take: pageSize,
		});

		return NextResponse.json({ news, total });
	} catch (err) {
		console.error('GET_USER_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_user_news' },
			{ status: 500 },
		);
	}
};
