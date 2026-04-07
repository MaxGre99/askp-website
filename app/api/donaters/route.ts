import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
	try {
		const donaters = await prisma.donater.findMany({
			orderBy: { name: 'asc' },
		});

		return NextResponse.json({ donaters });
	} catch (err) {
		return handleRouteError(err, 'GET_DONATERS_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_fetch_donaters' },
		// 	{ status: 500 },
		// );
	}
};

export const POST = async (req: Request) => {
	try {
		await getAuthUser('ADMIN');

		const { name, description, image } = await req.json();

		const donater = await prisma.donater.create({
			data: { name, description, image: image || null },
		});

		return NextResponse.json(donater);
	} catch (err) {
		return handleRouteError(err, 'CREATE_DONATER_ERROR:');
		// return NextResponse.json(
		// 	{ error: 'failed_to_create_donater' },
		// 	{ status: 500 },
		// );
	}
};
