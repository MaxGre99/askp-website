import { UserRole } from '@prisma/client';

type Permission =
	| 'news:create'
	| 'news:update'
	| 'news:delete'
	| 'events:create'
	| 'events:update'
	| 'events:delete'
	| 'users:manage';

const permissions: Record<UserRole, Permission[]> = {
	OWNER: [
		'news:create',
		'news:update',
		'news:delete',
		'events:create',
		'events:update',
		'events:delete',
		'users:manage',
	],
	ADMIN: ['news:create', 'news:update', 'events:create', 'events:update'],
	USER: [],
};

export const hasPermission = (userRole: UserRole, permission: Permission) => {
	return permissions[userRole]?.includes(permission);
};
