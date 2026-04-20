import { Metadata } from 'next';

import { ResetPasswordPage } from '@/widgets/reset-password';

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

const Page = () => {
	return <ResetPasswordPage />;
};

export default Page;
