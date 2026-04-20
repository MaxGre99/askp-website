import { Metadata } from 'next';

import { ContentList } from '@/widgets/content-list';

export const metadata: Metadata = {
	title: 'Новости',
	description:
		'Актуальные новости ассоциации АСКП — события, обновления, анонсы.',
	openGraph: {
		title: 'Новости | АСКП',
		description: 'Актуальные новости ассоциации АСКП.',
		url: '/news',
	},
};

const Page = () => {
	return <ContentList type='news' mode='all' />;
};

export default Page;
