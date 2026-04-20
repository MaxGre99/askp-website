import { Metadata } from 'next';

import { DonatersList } from '@/widgets/donaters/donate';

export const metadata: Metadata = {
	title: 'Поддержать АСКП',
	description: 'Поддержите деятельность ассоциации АСКП.',
	openGraph: { title: 'Поддержать АСКП', url: '/donate' },
};

const Page = () => {
	return <DonatersList />;
};

export default Page;
