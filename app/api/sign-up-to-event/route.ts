import { NextRequest, NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { sendEventRegistrationEmail } from '@/shared/lib/mails';

export const POST = async (req: NextRequest) => {
	try {
		const { eventName, name, phone, email, telegram, whatsapp, vk } =
			await req.json();

		if (!eventName || !name || !phone || !email)
			throw new ApiError('incorrect_form_data', 400);

		await sendEventRegistrationEmail({
			eventName,
			name,
			phone,
			email,
			telegram,
			whatsapp,
			vk,
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		return handleRouteError(err, 'SIGN_UP_TO_EVENT_FORM_ERROR');
	}
};
