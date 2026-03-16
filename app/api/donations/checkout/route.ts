import { NextResponse } from 'next/server';

import { v4 as uuid } from 'uuid';

import { yookassa } from '@/shared/lib/yookassa';

const AMOUNTS = [100, 300, 500, 1000]; // допустимые суммы

export const POST = async (req: Request) => {
	try {
		const { amount } = await req.json();

		// Валидация суммы на сервере — не доверяем клиенту
		if (!AMOUNTS.includes(amount)) {
			return NextResponse.json({ error: 'invalid_amount' }, { status: 400 });
		}

		const payment = await yookassa.createPayment(
			{
				amount: {
					value: String(amount),
					currency: 'RUB',
				},
				confirmation: {
					type: 'redirect',
					return_url: `${process.env.NEXT_PUBLIC_URL}/donate/success`,
				},
				capture: true,
				description: 'Донат проекту',
			},
			uuid(), // idempotency key — защита от дублей при сетевых сбоях
		);

		return NextResponse.json({ url: payment.confirmation.confirmation_url });
	} catch (err) {
		console.error('CREATE_PAYMENT_ERROR:', err);
		return NextResponse.json(
			{ error: 'failed_to_create_payment' },
			{ status: 500 },
		);
	}
};
