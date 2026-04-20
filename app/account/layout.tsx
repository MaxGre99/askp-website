import { ReactNode } from 'react';
import { Metadata } from 'next';

import { AccountClientLayout } from './client-layout';

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

export default function AccountLayout({ children }: { children: ReactNode }) {
	return <AccountClientLayout>{children}</AccountClientLayout>;
}
