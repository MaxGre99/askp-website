import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import slugify from '@/shared/lib/slugify';
import { Prisma } from '@prisma/client';

export const GET = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const query = url.searchParams.get('query') || '';
		const page = Number(url.searchParams.get('page') ?? 1);
		const pageSize = Number(url.searchParams.get('pageSize') ?? 4);

		const where: Prisma.NewsWhereInput = query
			? { title: { contains: query, mode: 'insensitive' as Prisma.QueryMode } }
			: {};

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
			{ error: 'Failed to fetch news' },
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
			{ error: 'Failed to create news' },
			{ status: 500 },
		);
	}
};
