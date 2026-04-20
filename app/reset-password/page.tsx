import { Suspense } from 'react';
import { Metadata } from 'next';

import { Loader } from '@/shared/ui/Loader';
import { ResetPasswordPage } from '@/widgets/reset-password';

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

const Page = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ResetPasswordPage />
		</Suspense>
	);
};

export default Page;
