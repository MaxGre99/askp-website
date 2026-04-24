import { NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
import { deleteS3File } from '@/shared/lib/deleteS3File';
import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const GET = async (
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id } = await params;

		const donater = await prisma.donater.findUnique({ where: { id } });

		if (!donater) throw new ApiError('not_found', 404);

		return NextResponse.json(donater);
	} catch (err) {
		return handleRouteError(err, 'GET_DONATER_ERROR');
	}
};

export const PATCH = async (
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		await getAuthUser('ADMIN');

		const { id } = await params;

		const body = await req.json();

		const updated = await prisma.donater.update({
			where: { id },
			data: { ...body, ...('image' in body && { image: body.image ?? null }) },
		});

		return NextResponse.json(updated);
	} catch (err) {
		return handleRouteError(err, 'PATCH_DONATER_ERROR');
	}
};

export const DELETE = async (
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		await getAuthUser('ADMIN');

		const { id } = await params;

		const donater = await prisma.donater.findUnique({ where: { id } });

		if (!donater) throw new ApiError('not_found', 404);

		if (donater.image?.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!)) {
			await deleteS3File(donater.image, 'donater-covers').catch(console.error);
		}

		await prisma.donater.delete({ where: { id } });

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'DELETE_DONATER_ERROR');
	}
};
