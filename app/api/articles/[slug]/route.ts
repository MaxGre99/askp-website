import { NextResponse } from 'next/server';

import { prisma } from '@/shared/lib/prisma';
import { slugify } from '@/shared/lib/slugify';

export const GET = async (
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ slug: string }>;
	},
) => {
	const { slug } = await params;
	try {
		const article = await prisma.article.findUnique({
			where: { slug },
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
		return NextResponse.json(article);
	} catch (err) {
		console.error('GET_ARTICLE_BY_SLUG_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_article' },
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
		const updated = await prisma.article.update({
			where: { slug },
			data: {
				...body,
				...('image' in body && { image: body.image ?? null }),
				...(body.title && { slug: slugify(body.title) }),
			},
		});
		return NextResponse.json(updated);
	} catch (err) {
		console.error('UPDATE_ARTICLE_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_update_article' },
			{ status: 500 },
		);
	}
};

export const DELETE = async (
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ slug: string }>;
	},
) => {
	const { slug } = await params;
	try {
		await prisma.article.delete({ where: { slug } });
		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('DELETE_ARTICLE_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_delete_article' },
			{ status: 500 },
		);
	}
};
