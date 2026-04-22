import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: true,
	auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const baseLayout = (content: string) => `
<div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; color: #1a1a1a; background: #ffffff;">
    <div style="background: #1a3a5c; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 20px; color: #ffffff; letter-spacing: 0.05em;">АСКП</h1>
        <p style="margin: 4px 0 0; font-size: 11px; color: rgba(255,255,255,0.6); letter-spacing: 0.08em; text-transform: uppercase;">
            Ассоциация Семейного Консультирования и Психотерапии
        </p>
    </div>
    <div style="padding: 32px; border: 1px solid #e8e8e8; border-top: none; border-radius: 0 0 8px 8px;">
        ${content}
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #aaa;">
            Это автоматическое уведомление от системы АСКП &nbsp;·&nbsp; ${new Date().toLocaleString('ru-RU')}
        </div>
    </div>
</div>
`;

const row = (label: string, value: string, link?: string) => {
	if (!value || value === '-') return '';
	const content = link
		? `<a href="${link}" style="color: #1a3a5c;">${value}</a>`
		: value;
	return `
        <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #888; font-size: 13px; width: 38%; vertical-align: top;">${label}</td>
            <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a;">${content}</td>
        </tr>
    `;
};

const contactsTable = (fields: Record<string, string | undefined>) => {
	const rows = Object.entries(fields)
		.filter(([, v]) => v && v !== '-')
		.map(([label, value]) => row(label, value!))
		.join('');
	if (!rows) return '';
	return `
        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 24px 0 8px;">Контакты</h3>
        <table style="width: 100%; border-collapse: collapse;">${rows}</table>
    `;
};

// Письма

export const sendFeedbackEmail = async (params: {
	type: string;
	name: string;
	phone: string;
	email: string;
	telegram?: string;
	whatsapp?: string;
	vk?: string;
	message?: string;
}) => {
	const typeLabel =
		params.type === 'cooperation' ? 'Сотрудничество' : 'Консультация';

	await transporter.sendMail({
		from: `"АСКП — Обратная связь" <${process.env.SMTP_USER}>`,
		to: process.env.FEEDBACK_EMAIL,
		subject: `Новая заявка — ${typeLabel}`,
		html: baseLayout(`
            <div style="display: inline-block; background: #eef4fb; color: #1a3a5c; font-size: 12px;
                padding: 4px 12px; border-radius: 20px; font-weight: bold; letter-spacing: 0.05em; margin-bottom: 20px;">
                ${typeLabel}
            </div>

            <h2 style="font-size: 18px; margin: 0 0 4px;">Новая заявка обратной связи</h2>
            <p style="margin: 0 0 24px; color: #888; font-size: 14px;">Поступил новый запрос через форму на сайте</p>

            <table style="width: 100%; border-collapse: collapse;">
                ${row('Имя', params.name)}
                ${row('Email', params.email, `mailto:${params.email}`)}
                ${row('Телефон', params.phone, `tel:${params.phone}`)}
            </table>

            ${contactsTable({
							Telegram: params.telegram,
							WhatsApp: params.whatsapp,
							ВКонтакте: params.vk,
						})}

            ${
							params.message
								? `
                <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 24px 0 8px;">Сообщение</h3>
                <div style="background: #f8f9fb; border-left: 3px solid #1a3a5c; padding: 14px 18px;
                    border-radius: 0 6px 6px 0; font-size: 14px; line-height: 1.7; color: #333;">
                    ${params.message}
                </div>
            `
								: ''
						}
        `),
	});
};

export const sendEventRegistrationEmail = async (params: {
	eventName: string;
	name: string;
	phone: string;
	email: string;
	telegram?: string;
	whatsapp?: string;
	vk?: string;
}) => {
	await transporter.sendMail({
		from: `"АСКП — Регистрация на мероприятие" <${process.env.SMTP_USER}>`,
		to: process.env.FEEDBACK_EMAIL,
		subject: `Регистрация на «${params.eventName}»`,
		html: baseLayout(`
            <h2 style="font-size: 18px; margin: 0 0 4px;">Новая регистрация на мероприятие</h2>
            <p style="margin: 0 0 24px; color: #888; font-size: 14px;">Участник зарегистрировался через форму на сайте</p>

            <div style="background: #f8f9fb; border: 1px solid #e0e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #888;">Мероприятие</p>
                <p style="margin: 4px 0 0; font-size: 16px; font-weight: bold; color: #1a3a5c;">${params.eventName}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
                ${row('Имя', params.name)}
                ${row('Email', params.email, `mailto:${params.email}`)}
                ${row('Телефон', params.phone, `tel:${params.phone}`)}
            </table>

            ${contactsTable({
							Telegram: params.telegram,
							WhatsApp: params.whatsapp,
							ВКонтакте: params.vk,
						})}
        `),
	});
};

export const sendRegistrationEmailToUser = async (params: {
	email: string;
	firstName: string;
	lastName: string;
}) => {
	await transporter.sendMail({
		from: `"АСКП" <${process.env.SMTP_USER}>`,
		to: params.email,
		subject: 'Ваша заявка на вступление в АСКП получена',
		html: baseLayout(`
            <p style="font-size: 16px; margin-bottom: 8px;">
                Уважаемый(-ая) <strong>${params.firstName} ${params.lastName}</strong>,
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
                Благодарим вас за интерес к нашей профессиональной ассоциации.
                Ваша заявка на вступление в АСКП успешно зарегистрирована и передана на рассмотрение.
            </p>
            <div style="background: #f4f7fb; border-left: 3px solid #1a3a5c; padding: 16px 20px;
                margin: 24px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">
                    Наши специалисты рассмотрят заявку в течение нескольких рабочих дней.
                    Как только решение будет принято — вы получите уведомление на этот адрес.
                </p>
            </div>
            <p style="font-size: 14px; color: #888; line-height: 1.6;">
                По вопросам обращайтесь:
                <a href="mailto:${process.env.FEEDBACK_EMAIL}" style="color: #1a3a5c;">
                    ${process.env.FEEDBACK_EMAIL}
                </a>
            </p>
        `),
	});
};

export const sendNewApplicationEmailToAdmin = async (params: {
	firstName: string;
	lastName: string;
	email: string;
	membershipLevel: string;
}) => {
	await transporter.sendMail({
		from: `"АСКП — Система" <${process.env.SMTP_USER}>`,
		to: process.env.FEEDBACK_EMAIL,
		subject: `Новая заявка — ${params.firstName} ${params.lastName} — ${params.membershipLevel}`,
		html: baseLayout(`
            <h2 style="font-size: 18px; margin: 0 0 24px;">Новая заявка на вступление</h2>
            <table style="width: 100%; border-collapse: collapse;">
                ${row('Имя', `${params.firstName} ${params.lastName}`)}
                ${row('Email', params.email, `mailto:${params.email}`)}
                ${row('Уровень членства', `${params.membershipLevel}`)}
            </table>
            <div style="margin-top: 28px; padding: 16px 20px; background: #fff8e1;
                border-left: 3px solid #f0a500; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 14px; color: #555;">
                    Перейдите в панель управления для рассмотрения заявки.
                </p>
            </div>
        `),
	});
};

export const sendApprovalEmail = async (params: {
	email: string;
	firstName: string;
	lastName: string;
}) => {
	await transporter.sendMail({
		from: `"АСКП" <${process.env.SMTP_USER}>`,
		to: params.email,
		subject: 'Добро пожаловать в АСКП — ваша заявка одобрена',
		html: baseLayout(`
            <p style="font-size: 16px; margin-bottom: 8px;">
                Уважаемый(-ая) <strong>${params.firstName} ${params.lastName}</strong>,
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
                Мы рады сообщить, что ваша заявка на вступление в 
                <strong style="color: #1a3a5c;">Ассоциацию Семейного Консультирования и Психотерапии</strong> 
                была рассмотрена и одобрена.
            </p>

            <div style="background: #eef7ee; border-left: 3px solid #2e7d32; padding: 16px 20px;
                margin: 24px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 15px; color: #2e7d32; font-weight: bold;">
                    ✓ Вы являетесь членом АСКП
                </p>
                <p style="margin: 8px 0 0; font-size: 13px; color: #555; line-height: 1.6;">
                    Теперь вам открыт доступ к возможностям личного кабинета — 
                    вы можете заполнить профиль специалиста и публиковать статьи.
                </p>
            </div>

            <p style="font-size: 15px; line-height: 1.7; color: #333;">
                Войдите на сайт, используя email и пароль, указанные при регистрации.
            </p>

            <p style="font-size: 14px; color: #888; line-height: 1.6; margin-top: 24px;">
                Если у вас возникнут вопросы, мы всегда готовы помочь —
                <a href="mailto:${process.env.FEEDBACK_EMAIL}" style="color: #1a3a5c;">
                    ${process.env.FEEDBACK_EMAIL}
                </a>
            </p>
        `),
	});
};

export const sendResetPasswordEmail = async (params: {
	email: string;
	link: string;
}) => {
	await transporter.sendMail({
		from: `"АСКП" <${process.env.SMTP_USER}>`,
		to: params.email,
		subject: 'Восстановление пароля',
		html: baseLayout(`
			<p>Для сброса пароля перейдите по ссылке:</p>

			<a href="${params.link}" 
				style="display:inline-block;padding:10px 16px;background:#1a3a5c;color:white;border-radius:6px;">
				Сбросить пароль
			</a>

			<p style="margin-top:16px;font-size:12px;color:#888;">
				Ссылка действительна 30 минут
			</p>

             <p style="font-size: 14px; color: #888; line-height: 1.6; margin-top: 24px;">
                Если у вас возникнут вопросы, мы всегда готовы помочь —
                <a href="mailto:${process.env.FEEDBACK_EMAIL}" style="color: #1a3a5c;">
                    ${process.env.FEEDBACK_EMAIL}
                </a>
            </p>
		`),
	});
};
