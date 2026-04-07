import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { slugify } from '@/shared/lib/formatters';
import { getAuthUser } from '@/shared/lib/getAuthUser';
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
		const showAll = url.searchParams.get('showAll') === 'true';

		const where: Prisma.ArticleWhereInput = {
			...(query && {
				title: { contains: query, mode: 'insensitive' as Prisma.QueryMode },
			}),
			...(!showAll && { published: true }),
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
		return handleRouteError(err, 'GET_ARTICLES_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_fetch_articles' },
		// 	{ status: 500 },
		// );
	}
};

export const POST = async (req: Request) => {
	try {
		const authUser = await getAuthUser();

		const { title, content, image, published } = await req.json();

		const slug = slugify(title);

		const article = await prisma.article.create({
			data: {
				title,
				content,
				image,
				authorId: authUser.id,
				published: published ?? false,
				slug,
			},
		});

		return NextResponse.json(article);
	} catch (err) {
		return handleRouteError(err, 'CREATE_ARTICLE_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_create_article' },
		// 	{ status: 500 },
		// );
	}
};
