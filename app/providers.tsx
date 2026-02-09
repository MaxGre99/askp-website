'use client';

// import { SessionProvider } from 'next-auth/react';
import ClientI18nProvider from '@/shared/providers/I18nextProvider';
import UserProvider from '@/shared/providers/UserProvider';
import StoreProvider from '@/shared/store/providers';

type Props = {
	children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
	return (
		// <SessionProvider>
		<StoreProvider>
			<ClientI18nProvider>
				<UserProvider>{children}</UserProvider>
			</ClientI18nProvider>
		</StoreProvider>
		// </SessionProvider>
	);
};

export default Providers;
