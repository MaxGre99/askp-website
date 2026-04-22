import { Suspense } from 'react';
import { Metadata } from 'next';

import { Loader } from '@/shared/ui/Loader';
import { SpecialistsPage } from '@/widgets/specialists/list';

export const metadata: Metadata = {
	title: 'Специалисты',
	description:
		'Каталог специалистов АСКП — семейные консультанты и психотерапевты.',
	openGraph: { title: 'Специалисты | АСКП', url: '/specialists' },
};

const Page = () => {
	return (
		<Suspense fallback={<Loader />}>
			<SpecialistsPage />
		</Suspense>
	);
};

export default Page;
