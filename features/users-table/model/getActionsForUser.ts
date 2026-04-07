import { FullUser, UserWithCreatedAt } from '@/entities/users';

import { UserAction } from './actions-config';

export const getActionsForUser = (
	user: UserWithCreatedAt | FullUser,
): UserAction[] => {
	if (!('status' in user)) return [];
	if (user.role === 'OWNER') return [];

	const { status, role } = user;
	const actions: UserAction[] = [];

	if (status === 'PENDING') {
		actions.push('approve', 'reject', 'block');
	}

	if (status === 'ACTIVE') {
		actions.push('block', 'reject');
		if (role === 'ADMIN') actions.push('setUser');
		if (role === 'USER') actions.push('setAdmin');
	}

	if (status === 'BLOCKED') {
		actions.push('unblock');
	}

	if (status === 'REJECTED') {
		actions.push('approve', 'block');
	}

	return actions;
};
