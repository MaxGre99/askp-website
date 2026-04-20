import { Suspense } from 'react';
import { Metadata } from 'next';

import { Loader } from '@/shared/ui/Loader';
import { ShopPage } from '@/widgets/shop';

export const metadata: Metadata = {
	title: 'Магазин',
	description: 'Курсы и материалы от специалистов АСКП.',
	openGraph: { title: 'Магазин | АСКП', url: '/shop' },
};

const Page = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ShopPage />
		</Suspense>
	);
};

export default Page;
