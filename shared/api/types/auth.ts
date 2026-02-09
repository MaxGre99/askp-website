export type SignUpDto = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

export type SignInDto = {
	email: string;
	password: string;
	rememberMe: boolean;
};

// export type ApiError = {
// 	status: number;
// 	data: {
// 		error: string;
// 	};
// };

export class ApiError extends Error {
	status: number;
	constructor(message: string, status = 400) {
		super(message);
		this.status = status;
	}
}
