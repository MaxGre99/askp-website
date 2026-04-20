import { NextResponse } from 'next/server';

import crypto from 'crypto';

import { ApiError } from '@/shared/api';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { sendResetPasswordEmail } from '@/shared/lib/mails';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (req: Request) => {
	try {
		const { email } = await req.json();

		if (!email) throw new ApiError('required_fields', 400);

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			// не палим наличие пользователя
			return NextResponse.json({ ok: true });
		}

		// RAW токен (идёт в ссылку)
		const rawToken = crypto.randomBytes(32).toString('hex');

		// HASH токен (храним в БД)
		const hashedToken = crypto
			.createHash('sha256')
			.update(rawToken)
			.digest('hex');

		const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 мин

		// удаляем старые токены
		await prisma.passwordResetToken.deleteMany({
			where: { userId: user.id },
		});

		await prisma.passwordResetToken.create({
			data: {
				token: hashedToken,
				userId: user.id,
				expires,
			},
		});

		const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${rawToken}`;

		await sendResetPasswordEmail({
			email: user.email,
			link: resetLink,
		});

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'RESET_PASSWORD_ERROR');
	}
};
