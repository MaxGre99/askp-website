import { Metadata } from 'next';

import { EditDonaterPage } from '@/widgets/donaters/edit-donater';

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

const Page = () => {
	return <EditDonaterPage />;
};

export default Page;
