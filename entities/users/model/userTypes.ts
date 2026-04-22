export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: 'OWNER' | 'ADMIN' | 'USER';
	membershipLevel:
		| 'PRESIDENT'
		| 'VICE_PRESIDENT'
		| 'EXPERT'
		| 'SPECIALIST'
		| 'PSYCHOLOGIST_PRACTITIONER'
		| 'BEGINNER_SPECIALIST'
		| 'PARTNER';
};

export type UserWithCreatedAt = User & {
	createdAt: string;
};

export type FullUser = UserWithCreatedAt & {
	status: 'PENDING' | 'ACTIVE' | 'REJECTED' | 'BLOCKED';
};
