import { NextResponse } from 'next/server';

import { getAuthUser } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
	try {
		const donaters = await prisma.donater.findMany({
			orderBy: { name: 'asc' },
		});
		return NextResponse.json({ donaters });
	} catch (err) {
		console.error('GET_DONATERS_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_fetch_donaters' },
			{ status: 500 },
		);
	}
};

export const POST = async (req: Request) => {
	await getAuthUser('ADMIN');
	try {
		const { name, description, image } = await req.json();
		const donater = await prisma.donater.create({
			data: { name, description, image: image || null },
		});
		return NextResponse.json(donater);
	} catch (err) {
		console.error('CREATE_DONATER_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_create_donater' },
			{ status: 500 },
		);
	}
};
