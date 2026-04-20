import { Metadata } from 'next';

import { EditProductPage } from '@/widgets/products/edit';

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

const Page = () => {
	return <EditProductPage />;
};

export default Page;
