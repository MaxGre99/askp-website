import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: 'OWNER' | 'ADMIN' | 'USER';
		} & DefaultSession['user'];
	}

	interface User extends DefaultUser {
		id: string;
		role: 'OWNER' | 'ADMIN' | 'USER';
	}

	interface JWT {
		id: string;
		role: 'OWNER' | 'ADMIN' | 'USER';
	}
}
