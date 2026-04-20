import { Metadata } from 'next';

import { SpecialistsPage } from '@/widgets/list';

export const metadata: Metadata = {
	title: 'Специалисты',
	description:
		'Каталог специалистов АСКП — семейные консультанты и психотерапевты.',
	openGraph: { title: 'Специалисты | АСКП', url: '/specialists' },
};

const Page = () => {
	return <SpecialistsPage />;
};

export default Page;
