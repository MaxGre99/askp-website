import { NextResponse } from 'next/server';

// import { Prisma } from '@prisma/client';
// import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { guardOwner } from '@/shared/lib/guardOwner';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id: userId } = await params;

		// проверяем, что это ADMIN или OWNER
		await getAuthUser('ADMIN');
		await guardOwner(userId);

		await prisma.user.update({
			where: { id: userId },
			data: { status: 'BLOCKED' },
		});

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'BLOCK_USER_ERROR');

		// if (err instanceof ApiError)
		// 	return NextResponse.json({ error: err.message }, { status: err.status });

		// if (err instanceof Prisma.PrismaClientKnownRequestError)
		// 	return NextResponse.json({ error: 'database_error' }, { status: 500 });

		// return NextResponse.json(
		// 	{ error: 'internal_server_error' },
		// 	{ status: 500 },
		// );
	}
};
