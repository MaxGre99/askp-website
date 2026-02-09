export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	avatar?: string | null;
	role: 'OWNER' | 'ADMIN' | 'USER';
};
