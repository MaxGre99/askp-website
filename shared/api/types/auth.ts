export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	photo?: string | null;
	role: 'OWNER' | 'ADMIN' | 'USER';
};

export type RegisterDto = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

export type LoginDto = {
	email: string;
	password: string;
	rememberMe: boolean;
};

export type ApiError = {
	status: number;
	data: {
		error: string;
	};
};
