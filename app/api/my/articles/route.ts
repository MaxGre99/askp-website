import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/auth';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const GET = async (req: Request) => {
	try {
		const authUser = await getAuthUser();

		const url = new URL(req.url);
		const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
		const pageSize = Math.min(
			50,
			Math.max(1, Number(url.searchParams.get('pageSize') ?? 4)),
		);

		const where = {
			authorId: authUser.id,
		};

		const total = await prisma.article.count({ where });

		const articles = await prisma.article.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * pageSize,
			take: pageSize,
			include: {
				author: {
					select: {
						firstName: true,
						lastName: true,
						profile: {
							select: { displayName: true },
						},
					},
				},
			},
		});

		return NextResponse.json({ articles, total });
	} catch (err) {
		return handleRouteError(err, 'GET_USER_ARTICLES_ERROR:');
		// return NextResponse.json(
		// 	{ error: 'failed_to_fetch_user_articles' },
		// 	{ status: 500 },
		// );
	}
};
