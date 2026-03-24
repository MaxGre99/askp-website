import { NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { guardOwner } from '@/shared/lib/guardOwner';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id: userId } = await params;

		/* const authAdmin = */ await getAuthUser('ADMIN');
		await guardOwner(userId);

		await /* prisma.$transaction([ */
		prisma.user.update({
			where: { id: userId },
			data: {
				role: 'ADMIN',
				// status: 'ACTIVE',
				// approvedAt: new Date(),
				// approvedBy: authAdmin.id,
			},
		});
		/* prisma.profile.upsert({
				where: { userId },
				update: {},
				create: { userId },
			}),
		]); */

		return NextResponse.json({ ok: true });
	} catch (err: unknown) {
		console.error('SET_ADMIN_USER_ERROR:', err);
		if (err instanceof ApiError) {
			return NextResponse.json({ error: err.message }, { status: err.status });
		}
		return NextResponse.json(
			{ error: 'internal_server_error' },
			{ status: 500 },
		);
	}
};
