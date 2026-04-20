import { Metadata } from 'next';

import { AddDonaterPage } from '@/widgets/donaters/add-donater';

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

const Page = () => {
	return <AddDonaterPage />;
};

export default Page;
