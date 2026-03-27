import { NextRequest, NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { sendFeedbackEmail } from '@/shared/lib/mails';

export const POST = async (req: NextRequest) => {
	try {
		const { type, name, phone, email, telegram, whatsapp, vk, message } =
			await req.json();

		if (!type || !name || !phone || !email)
			throw new ApiError('incorrect_form_data', 400);

		await sendFeedbackEmail({
			type,
			name,
			phone,
			email,
			telegram,
			whatsapp,
			vk,
			message,
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		return handleRouteError(err, 'FEEDBACK_FORM_ERROR');
	}
};
