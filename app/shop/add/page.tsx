import { Metadata } from 'next';

import { AddProductPage } from '@/widgets/products/add';

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

const Page = () => {
	return <AddProductPage />;
};

export default Page;
