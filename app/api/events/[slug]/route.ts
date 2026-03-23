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
		const event = await prisma.event.findUnique({ where: { slug } });
		return NextResponse.json(event);
	} catch (err) {
		console.error('GET_EVENT_BY_ID_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_event' },
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
		const updated = await prisma.event.update({
			where: { slug },
			data: {
				...body,
				...('image' in body && { image: body.image ?? null }),
				...(body.eventDate && { eventDate: new Date(body.eventDate) }),
				...(body.title && { slug: slugify(body.title) }),
			},
		});
		return NextResponse.json(updated);
	} catch (err) {
		console.error('UPDATE_EVENT_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_update_event' },
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
		await prisma.event.delete({ where: { slug } });
		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('DELETE_EVENT_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_delete_event' },
			{ status: 500 },
		);
	}
};
