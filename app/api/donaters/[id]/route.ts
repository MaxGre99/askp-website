import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/auth';
import { deleteS3File } from '@/shared/lib/deleteS3File';
import { prisma } from '@/shared/lib/prisma';

export const GET = async (
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	const { id } = await params;
	try {
		const donater = await prisma.donater.findUnique({ where: { id } });
		if (!donater)
			return NextResponse.json({ error: 'not_found' }, { status: 404 });
		return NextResponse.json(donater);
	} catch {
		return NextResponse.json(
			{ error: 'failed_to_fetch_donater' },
			{ status: 500 },
		);
	}
};

export const PATCH = async (
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	await getAuthUser('ADMIN');
	const { id } = await params;
	try {
		const body = await req.json();
		const updated = await prisma.donater.update({
			where: { id },
			data: { ...body, image: body.image ?? null },
		});
		return NextResponse.json(updated);
	} catch {
		return NextResponse.json(
			{ error: 'failed_to_update_donater' },
			{ status: 500 },
		);
	}
};

export const DELETE = async (
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	await getAuthUser('ADMIN');
	const { id } = await params;
	try {
		const donater = await prisma.donater.findUnique({ where: { id } });
		if (!donater)
			return NextResponse.json({ error: 'not_found' }, { status: 404 });

		if (donater.image) {
			await deleteS3File(donater.image, 'donater-covers').catch(console.error);
		}

		await prisma.donater.delete({ where: { id } });
		return NextResponse.json({ ok: true });
	} catch {
		return NextResponse.json(
			{ error: 'failed_to_delete_donater' },
			{ status: 500 },
		);
	}
};
