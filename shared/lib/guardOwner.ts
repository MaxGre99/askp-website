import { ApiError } from '../api';

import { prisma } from './prisma';

export const guardOwner = async (userId: string) => {
	const target = await prisma.user.findUnique({
		where: { id: userId },
		select: { role: true },
	});

	if (!target) throw new ApiError('user_not_found', 404);
	if (target.role === 'OWNER') throw new ApiError('cannot_modify_owner', 403);
};
