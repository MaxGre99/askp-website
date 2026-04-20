import { Metadata } from 'next';

import { ShopPage } from '@/widgets/shop';

export const metadata: Metadata = {
	title: 'Магазин',
	description: 'Курсы и материалы от специалистов АСКП.',
	openGraph: { title: 'Магазин | АСКП', url: '/shop' },
};

const Page = () => {
	return <ShopPage />;
};

export default Page;
