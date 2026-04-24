import { NextResponse } from 'next/server';

import { deleteS3File } from '@/shared/lib/deleteS3File';
import { slugify } from '@/shared/lib/formatters';
import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { extractImageUrls } from '@/shared/lib/helpers';
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

		const event = await prisma.event.findUnique({ where: { slug } });

		return NextResponse.json(event);
	} catch (err) {
		return handleRouteError(err, 'GET_EVENT_BY_ID_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_fetch_event' },
		// 	{ status: 500 },
		// );
	}
};

export const PATCH = async (
	req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	try {
		await getAuthUser('ADMIN');

		const { slug } = await params;

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
		return handleRouteError(err, 'UPDATE_EVENT_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_update_event' },
		// 	{ status: 500 },
		// );
	}
};

export const DELETE = async (
	_req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	try {
		await getAuthUser('ADMIN');

		const { slug } = await params;

		const event = await prisma.event.findUnique({ where: { slug } });
		if (!event)
			return NextResponse.json({ error: 'not_found' }, { status: 404 });

		if (event.image?.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!)) {
			await deleteS3File(event.image, 'event-covers').catch(console.error);
		}

		const descImageUrls = extractImageUrls(event.description);
		await Promise.allSettled(
			descImageUrls
				.filter((url) =>
					url.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!),
				)
				.map((url) => deleteS3File(url, 'event-images')),
		);

		await prisma.event.delete({ where: { slug } });

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'DELETE_EVENT_ERROR');
	}
};
