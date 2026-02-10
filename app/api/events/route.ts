import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import slugify from '@/shared/lib/slugify';

export const GET = async () => {
	try {
		const events = await prisma.event.findMany({
			orderBy: { eventDate: 'desc' },
		});
		return NextResponse.json(events);
	} catch (err) {
		console.error('GET_EVENTS_ERROR:', err);
		return NextResponse.json(
			{ error: 'Failed to fetch events' },
			{ status: 500 },
		);
	}
};

export const POST = async (req: Request) => {
	try {
		const body = await req.json();
		const { title, description, image, authorId, eventDate, published } = body;
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
			{ error: 'Failed to create event' },
			{ status: 500 },
		);
	}
};
