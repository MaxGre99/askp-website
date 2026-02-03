'use client';

// import { SessionProvider } from 'next-auth/react';
import ClientI18nProvider from '@/shared/providers/I18nextProvider';

type Props = {
	children: React.ReactNode;
};

export default function Providers({ children }: Props) {
	return (
		// <SessionProvider>
		<ClientI18nProvider>{children}</ClientI18nProvider>
		// </SessionProvider>
	);
}
