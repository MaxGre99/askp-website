import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';
import { slugify } from '@/shared/lib/slugify';

export const GET = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const query = url.searchParams.get('query') || '';
		const authorId = url.searchParams.get('authorId');
		const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
		const pageSize = Math.min(
			50,
			Math.max(1, Number(url.searchParams.get('pageSize') ?? 4)),
		);

		const where: Prisma.NewsWhereInput = {
			...(query && {
				title: {
					contains: query,
					mode: 'insensitive',
				},
			}),
			...(authorId && { authorId }),
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
		console.error('GET_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_news_list' },
			{ status: 500 },
		);
	}
};

export const POST = async (req: Request) => {
	try {
		const { title, content, image, authorId, published } = await req.json();
		const slug = slugify(title);

		const news = await prisma.news.create({
			data: {
				title,
				content,
				image,
				authorId,
				published: published ?? true,
				slug,
			},
		});

		return NextResponse.json(news);
	} catch (err) {
		console.error('CREATE_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_create_news' },
			{ status: 500 },
		);
	}
};
