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