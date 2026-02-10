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
		const event = await prisma.event.findUnique({ where: { slug } });
		return NextResponse.json(event);
	} catch (err) {
		console.error('GET_EVENT_BY_ID_ERROR:', err);
		return NextResponse.json(
			{ error: 'Failed to fetch event' },
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
				slug: body.title ? slugify(body.title) : undefined,
			},
		});
		return NextResponse.json(updated);
	} catch (err) {
		console.error('UPDATE_EVENT_ERROR:', err);
		return NextResponse.json(
			{ error: 'Failed to update event' },
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
		await prisma.event.delete({ where: { slug } });
		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('DELETE_EVENT_ERROR:', err);
		return NextResponse.json(
			{ error: 'Failed to delete event' },
			{ status: 500 },
		);
	}
};
