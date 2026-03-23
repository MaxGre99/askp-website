import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { getAuthUser } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { slugify } from '@/shared/lib/slugify';

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
		const withAuthor = url.searchParams.get('withAuthor') === 'true';

		const where: Prisma.NewsWhereInput = {
			...(query && {
				title: { contains: query, mode: 'insensitive' as Prisma.QueryMode },
			}),
			...(!showAll && { published: true }),
		};

		const total = await prisma.news.count({ where });

		const news = await prisma.news.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * pageSize,
			take: pageSize,
			...(withAuthor && {
				include: {
					author: {
						select: {
							firstName: true,
							lastName: true,
							profile: { select: { displayName: true } },
						},
					},
				},
			}),
		});

		return NextResponse.json({ news, total });
	} catch (err) {
		console.error('GET_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_news_list' },
			{ status: 500 },
		);
	}
};

export const POST = async (req: Request) => {
	const authUser = await getAuthUser('ADMIN');

	try {
		const { title, content, image, published } = await req.json();
		const slug = slugify(title);

		const news = await prisma.news.create({
			data: {
				title,
				content,
				image,
				authorId: authUser.id,
				published: published ?? false,
				slug,
			},
		});

		return NextResponse.json(news);
	} catch (err) {
		if (
			err instanceof Prisma.PrismaClientKnownRequestError &&
			err.code === 'P2002'
		) {
			return NextResponse.json(
				{ error: 'slug_already_exists' },
				{ status: 409 },
			);
		}
		console.error('CREATE_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_create_news' },
			{ status: 500 },
		);
	}
};
