import { NextRequest, NextResponse } from 'next/server';

import { ApiError } from '@/shared/api';
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
		if (err instanceof ApiError)
			return NextResponse.json({ error: err.message }, { status: err.status });
		return NextResponse.json({ error: 'sending_form_error' }, { status: 500 });
	}
};
