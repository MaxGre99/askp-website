import { MembershipLevel } from '@/shared/custom-types';

export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: 'OWNER' | 'ADMIN' | 'USER';
	membershipLevel: MembershipLevel;
};

export type UserWithCreatedAt = User & {
	createdAt: string;
};

export type FullUser = UserWithCreatedAt & {
	status: 'PENDING' | 'ACTIVE' | 'REJECTED' | 'BLOCKED';
};
