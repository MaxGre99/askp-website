import { NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id: userId } = await params;

		const authAdmin = await getAuthUser();

		await prisma.$transaction([
			prisma.user.update({
				where: { id: userId },
				data: {
					status: 'ACTIVE',
					approvedAt: new Date(),
					approvedBy: authAdmin.id,
				},
			}),
			prisma.profile.create({
				data: { userId },
			}),
		]);

		return NextResponse.json({ ok: true });
	} catch (err: unknown) {
		console.error('APPROVE_USER_ERROR:', err);
		if (err instanceof ApiError) {
			return NextResponse.json({ error: err.message }, { status: err.status });
		}
		return NextResponse.json(
			{ error: 'internal_server_error' },
			{ status: 500 },
		);
	}
};
