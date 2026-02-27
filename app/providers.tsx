'use client';

import { ClientI18nProvider, StoreProvider } from '@/shared/providers';
import { store } from './store';
import { UserProvider } from '@/entities/users';
// import { SessionProvider } from 'next-auth/react';

type Props = {
	children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
	return (
		// <SessionProvider>
		<StoreProvider store={store}>
			<ClientI18nProvider>
				<UserProvider>{children}</UserProvider>
			</ClientI18nProvider>
		</StoreProvider>
		// </SessionProvider>
	);
};
