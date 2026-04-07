export type UserRole = 'OWNER' | 'ADMIN' | 'USER';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'REJECTED' | 'BLOCKED';

export const USER_ROLE_STYLES: Record<UserRole, string> = {
	OWNER: 'bg-blue-100 text-blue-700',
	ADMIN: 'bg-fuchsia-100 text-fuchsia-700',
	USER: 'bg-gray-100 text-gray-600',
};

export const USER_STATUS_STYLES: Record<UserStatus, string> = {
	ACTIVE: 'bg-green-100 text-green-700',
	PENDING: 'bg-yellow-100 text-yellow-700',
	REJECTED: 'bg-red-100 text-red-700',
	BLOCKED: 'bg-red-200 text-red-800',
};
