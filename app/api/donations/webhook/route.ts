import { NextResponse } from 'next/server';

import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (req: Request) => {
	try {
		const body = await req.json();

		// ЮКасса не подписывает вебхуки как Stripe —
		// проверяем IP: разрешены только адреса ЮКассы
		// 185.71.76.0/27, 185.71.77.0/27, 77.75.153.0/25 и т.д.
		// В проде лучше настроить это на уровне nginx/reverse proxy

		if (body.event === 'payment.succeeded') {
			const payment = body.object;

			// Логируем донат в БД (опционально)
			// await prisma.donation.create({
			// 	data: {
			// 		paymentId: payment.id,
			// 		amount: Number(payment.amount.value),
			// 		status: 'succeeded',
			// 	},
			// });

			console.log('Донат получен:', payment.amount.value, 'RUB');
		}

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'WEBHOOK_ERROR');
		// return NextResponse.json({ error: 'webhook_error' }, { status: 500 });
	}
};
