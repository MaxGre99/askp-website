import { Metadata } from 'next';

import { ContentList } from '@/widgets/content-list';

export const metadata: Metadata = {
	title: 'Статьи',
	description:
		'Профессиональные статьи специалистов АСКП по психологии и психотерапии.',
	openGraph: { title: 'Статьи | АСКП', url: '/articles' },
};

const Page = () => {
	return <ContentList type='articles' mode='all' />;
};

export default Page;
