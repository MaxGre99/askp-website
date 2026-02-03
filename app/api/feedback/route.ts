import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();

		const { type, name, phone, email, telegram, whatsapp, message } = body;

		if (!type || !name || !(phone || email || telegram || whatsapp)) {
			return NextResponse.json(
				{ error: 'Некорректные данные формы' },
				{ status: 400 },
			);
		}

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const mailText = `
Новая заявка с сайта

Тема: ${type === 'cooperation' ? 'Сотрудничество' : 'Консультация'}
Имя: ${name}

Контакты:
Телефон: ${phone || '-'}
Email: ${email || '-'}
Telegram: ${telegram || '-'}
WhatsApp: ${whatsapp || '-'}

Сообщение:
${message || '-'}
`;

		await transporter.sendMail({
			from: `"Форма сайта" <${process.env.SMTP_USER}>`,
			to: process.env.FEEDBACK_EMAIL,
			subject: 'Новая заявка с сайта',
			text: mailText,
		});

		return NextResponse.json({ success: true });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: 'Ошибка отправки' }, { status: 500 });
	}
};
