import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export const POST = async (
	_: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	const { id } = await params;
	await prisma.user.update({
		where: { id },
		data: {
			status: 'BLOCKED',
		},
	});

	return NextResponse.json({ ok: true });
};
