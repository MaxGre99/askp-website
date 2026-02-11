import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import slugify from '@/shared/lib/slugify';

export const GET = async (
	req: Request,
	{
		params,
	}: {
		params: Promise<{ slug: string }>;
	},
) => {
	const { slug } = await params;
	try {
		const news = await prisma.news.findUnique({ where: { slug } });
		return NextResponse.json(news);
	} catch (err) {
		console.error('GET_NEWS_BY_SLUG_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_news' },
			{ status: 500 },
		);
	}
};

export const PATCH = async (
	req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	const { slug } = await params;
	try {
		const body = await req.json();
		const updated = await prisma.news.update({
			where: { slug },
			data: { ...body, slug: body.title ? slugify(body.title) : undefined },
		});
		return NextResponse.json(updated);
	} catch (err) {
		console.error('UPDATE_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_update_news' },
			{ status: 500 },
		);
	}
};

export const DELETE = async (
	req: Request,
	{
		params,
	}: {
		params: Promise<{ slug: string }>;
	},
) => {
	const { slug } = await params;
	try {
		await prisma.news.delete({ where: { slug } });
		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('DELETE_NEWS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_delete_news' },
			{ status: 500 },
		);
	}
};
