import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { ApiError } from '@/shared/api';

export const handleRouteError = (err: unknown, context?: string) => {
	if (context) console.error(`${context}:`, err);

	if (err instanceof ApiError) {
		return NextResponse.json({ error: err.message }, { status: err.status });
	}

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		// P2002 — unique constraint (slug, email и т.д.)
		if (err.code === 'P2002') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const cause = (err.meta?.driverAdapterError as any)?.cause;
			const constraintFields: string[] =
				cause?.constraint?.fields ?? cause?.constraint ?? [];
			const constraintName: string = cause?.originalMessage ?? '';

			const isSlug =
				constraintFields.includes('slug') || constraintName.includes('slug');
			const isEmail =
				constraintFields.includes('email') || constraintName.includes('email');

			const key = isSlug
				? 'slug_already_exists'
				: isEmail
					? 'already_exists'
					: 'unique_constraint_violation';

			return NextResponse.json({ error: key }, { status: 409 });
		}
		// P2025 — запись не найдена
		if (err.code === 'P2025') {
			return NextResponse.json({ error: 'not_found' }, { status: 404 });
		}
		return NextResponse.json({ error: 'database_error' }, { status: 500 });
	}

	if (err instanceof Prisma.PrismaClientValidationError) {
		return NextResponse.json(
			{ error: 'database_validation_error' },
			{ status: 400 },
		);
	}

	if (err instanceof Error && err.message.includes('SMTP')) {
		return NextResponse.json({ error: 'sending_form_error' }, { status: 500 });
	}

	return NextResponse.json({ error: 'internal_server_error' }, { status: 500 });
};
