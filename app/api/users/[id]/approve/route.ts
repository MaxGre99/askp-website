import { NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
import { getAuthUser } from '@/shared/lib/auth';
import { guardOwner } from '@/shared/lib/guardOwner';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { sendApprovalEmail } from '@/shared/lib/mails';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id: userId } = await params;

		const authAdmin = await getAuthUser('ADMIN');
		await guardOwner(userId);

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				firstName: true,
				lastName: true,
				email: true,
			},
		});

		if (!user) {
			throw new ApiError('user_not_found', 404);
		}

		await prisma.$transaction([
			// Активируем пользователя
			prisma.user.update({
				where: { id: userId },
				data: {
					status: 'ACTIVE',
					approvedAt: new Date(),
					approvedBy: authAdmin.id,
				},
			}),

			// Upsert профиля с копированием имён
			prisma.profile.upsert({
				where: { userId },
				update: {}, // если профиль уже есть — ничего не меняем
				create: {
					userId,
					firstName: user.firstName || null, // или '' если хочешь пустую строку
					lastName: user.lastName || null,
					displayName:
						user.firstName && user.lastName
							? `${user.firstName} ${user.lastName}`.trim()
							: null,
				},
			}),
		]);

		// Отправка письма
		await sendApprovalEmail({
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		}).catch(console.error);

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'APPROVE_USER_ERROR');
		// if (err instanceof ApiError) {
		// 	return NextResponse.json({ error: err.message }, { status: err.status });
		// }
		// return NextResponse.json(
		// 	{ error: 'internal_server_error' },
		// 	{ status: 500 },
		// );
	}
};
