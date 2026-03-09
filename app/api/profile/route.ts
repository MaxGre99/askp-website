import { NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export const GET = async () => {
	try {
		const authUser = await getAuthUser();

		// ленивое создание профиля
		let profile = await prisma.profile.findUnique({
			where: { userId: authUser.id },
		});

		if (!profile) {
			profile = await prisma.profile.create({
				data: { userId: authUser.id },
			});
		}

		return NextResponse.json(profile);
	} catch (err: unknown) {
		console.error('GET_PROFILE_ERROR:', err);
		if (err instanceof ApiError)
			return NextResponse.json({ error: err.message }, { status: err.status });
		return NextResponse.json(
			{ error: 'internal_server_error' },
			{ status: 500 },
		);
	}
};

export const PUT = async (req: Request) => {
	try {
		const authUser = await getAuthUser();
		const body = await req.json();

		const profile = await prisma.profile.update({
			where: { userId: authUser.id },
			data: {
				firstName: body.firstName ?? null,
				lastName: body.lastName ?? null,
				middleName: body.middleName ?? null,
				displayName: body.displayName ?? null,
				gender: body.gender ?? null,
				city: body.city ?? null,
				languages: body.languages ?? [],
				maritalStatus: body.maritalStatus ?? null,
				birthDate: body.birthDate ? new Date(body.birthDate) : null,
				shortBio: body.shortBio ?? null,
				fullBio: body.fullBio ?? null,
				phone: body.phone ?? null,
				telegramUser: body.telegramUser ?? null,
				telegramChannel: body.telegramChannel ?? null,
				vkUrl: body.vkUrl ?? null,
				website: body.website ?? null,
				phoneRefs: body.phoneRefs ?? null,
			},
		});

		return NextResponse.json(profile);
	} catch (err: unknown) {
		console.error('UPDATE_PROFILE_ERROR:', err);
		if (err instanceof ApiError)
			return NextResponse.json({ error: err.message }, { status: err.status });
		return NextResponse.json(
			{ error: 'internal_server_error' },
			{ status: 500 },
		);
	}
};
