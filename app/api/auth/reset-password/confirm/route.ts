import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { ApiError } from '@/shared/api';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (req: Request) => {
	try {
		const { token, password } = await req.json();

		if (!token || !password) {
			throw new ApiError('required_fields', 400);
		}

		// ХЭШИРУЕМ ПРИШЕДШИЙ TOKEN
		const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

		const record = await prisma.passwordResetToken.findUnique({
			where: { token: hashedToken },
		});

		if (!record || record.expires < new Date()) {
			throw new ApiError('invalid_token', 400);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.$transaction([
			prisma.user.update({
				where: { id: record.userId },
				data: { password: hashedPassword },
			}),
			prisma.passwordResetToken.delete({
				where: { token: hashedToken },
			}),
		]);

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'RESET_CONFIRM_ERROR');
	}
};
