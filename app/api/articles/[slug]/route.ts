import { NextResponse } from 'next/server';

import { slugify } from '@/shared/lib/formatters';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const GET = async (
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ slug: string }>;
	},
) => {
	try {
		const { slug } = await params;

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
		return handleRouteError(err, 'GET_ARTICLE_BY_SLUG_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_fetch_article' },
		// 	{ status: 500 },
		// );
	}
};

export const PATCH = async (
	req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	try {
		const { slug } = await params;

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
		return handleRouteError(err, 'UPDATE_ARTICLE_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_update_article' },
		// 	{ status: 500 },
		// );
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
	try {
		const { slug } = await params;

		await prisma.article.delete({ where: { slug } });

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'DELETE_ARTICLE_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_delete_article' },
		// 	{ status: 500 },
		// );
	}
};
