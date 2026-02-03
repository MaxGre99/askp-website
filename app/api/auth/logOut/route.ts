import { NextResponse } from 'next/server';

export const POST = async () => {
	const res = NextResponse.json({ ok: true });

	res.cookies.set('token', '', {
		httpOnly: true,
		path: '/',
		maxAge: 0,
	});

	return res;
};
