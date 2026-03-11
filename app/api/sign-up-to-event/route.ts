import { NextRequest, NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

import { ApiError } from '@/shared/api';

export const POST = async (req: NextRequest) => {
	try {
		const { eventName, name, phone, email, telegram, whatsapp } =
			await req.json();

		if (!eventName || !name || !(phone || email || telegram || whatsapp))
			throw new ApiError('incorrect_form_data', 400);

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
		});

		const mailText = `
Новая регистрация на событие "${eventName}"

Имя: ${name}

Контакты:
Телефон: ${phone || '-'}
Email: ${email || '-'}
Telegram: ${telegram || '-'}
WhatsApp: ${whatsapp || '-'}
`;

		await transporter.sendMail({
			from: `Форма регистрации на событие "${eventName}"; <${process.env.SMTP_USER}>`,
			to: process.env.FEEDBACK_EMAIL,
			subject: `Новая регистрация на событие "${eventName}"`,
			text: mailText,
		});

		return NextResponse.json({ success: true });
	} catch (err: unknown) {
		console.error('SIGN_UP_TO_EVENT_ERROR:', err);
		if (err instanceof ApiError)
			return NextResponse.json({ error: err.message }, { status: err.status });
		return NextResponse.json({ error: 'sending_form_error' }, { status: 500 });
	}
};
