import { NextRequest, NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

import { ApiError } from '@/shared/api';

export const POST = async (req: NextRequest) => {
	try {
		const { type, name, phone, email, telegram, whatsapp, message, vk } =
			await req.json();

		if (!type || !name || !phone || !email)
			throw new ApiError('incorrect_form_data', 400);

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
		});

		const mailText = `
Новая заявка обратной связи

Тема: ${type === 'cooperation' ? 'Сотрудничество' : 'Консультация'}

Имя: ${name}

Контакты:
Телефон: ${phone || '-'}
Email: ${email || '-'}
Telegram: ${telegram || '-'}
WhatsApp: ${whatsapp || '-'}
Вконтакте: ${vk || '-'}

Сообщение:
${message || '-'}
`;

		await transporter.sendMail({
			from: `Форма обратной связи; <${process.env.SMTP_USER}>`,
			to: process.env.FEEDBACK_EMAIL,
			subject: 'Новая заявка обратной связи',
			text: mailText,
		});

		return NextResponse.json({ success: true });
	} catch (err: unknown) {
		console.error('FEEDBACK_ERROR:', err);
		if (err instanceof ApiError)
			return NextResponse.json({ error: err.message }, { status: err.status });
		return NextResponse.json({ error: 'sending_form_error' }, { status: 500 });
	}
};
