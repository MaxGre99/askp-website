import { cookies } from 'next/headers';

import { UserRole, UserStatus } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { ApiError } from '@/shared/api';
import { prisma } from '@/shared/lib/prisma';

interface JwtPayload {
	id: string;
	role: UserRole;
}

export async function getAuthUser(requiredRole?: UserRole) {
	const cookieStore = await cookies();
	const token = cookieStore.get('askp-token')?.value;

	if (!token) throw new ApiError('unauthorized', 401);

	let payload: JwtPayload;

	try {
		payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
	} catch {
		throw new ApiError('invalid_token', 401);
	}

	const user = await prisma.user.findUnique({
		where: { id: payload.id },
	});

	if (!user) throw new ApiError('user_not_found', 404);

	if (user.status !== UserStatus.ACTIVE)
		throw new ApiError('not_approved', 403);

	if (requiredRole && user.role !== requiredRole && user.role !== 'OWNER')
		throw new ApiError('forbidden', 403);

	return user;
}
