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

		const where: Prisma.EventWhereInput = {
			...(query && {
				title: { contains: query, mode: 'insensitive' as Prisma.QueryMode },
			}),
			...(!showAll && { published: true }),
		};

		const total = await prisma.event.count({ where });

		const events = await prisma.event.findMany({
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
	const authUser = await getAuthUser('ADMIN');

	try {
		const { title, description, image, eventDate, published } =
			await req.json();
		const slug = slugify(title);

		const event = await prisma.event.create({
			data: {
				title,
				description,
				image,
				authorId: authUser.id,
				eventDate: new Date(eventDate),
				published: published ?? false,
				slug,
			},
		});

		return NextResponse.json(event);
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
		console.error('CREATE_EVENT_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_create_event' },
			{ status: 500 },
		);
	}
};
