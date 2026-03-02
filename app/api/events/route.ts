import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';
import slugify from '@/shared/lib/slugify';

export const GET = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const query = url.searchParams.get('query') || '';
		const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
		const pageSize = Math.min(
			50,
			Math.max(1, Number(url.searchParams.get('pageSize') ?? 4)),
		);

		const where: Prisma.EventWhereInput = query
			? { title: { contains: query, mode: 'insensitive' as Prisma.QueryMode } }
			: {};

		const total = await prisma.event.count({ where });
		const events = await prisma.event.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * pageSize,
			take: pageSize,
		});

		return NextResponse.json({ events, total });
	} catch (err) {
		console.error('GET_EVENTS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_events' },
			{ status: 500 },
		);
	}
};

export const POST = async (req: Request) => {
	try {
		const { title, description, image, authorId, eventDate, published } =
			await req.json();
		const slug = slugify(title);

		const event = await prisma.event.create({
			data: {
				title,
				description,
				image,
				authorId,
				eventDate: new Date(eventDate),
				published: published ?? true,
				slug,
			},
		});

		return NextResponse.json(event);
	} catch (err) {
		console.error('CREATE_EVENT_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_create_event' },
			{ status: 500 },
		);
	}
};
