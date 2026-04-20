import { Metadata } from 'next';

import { ContentList } from '@/widgets/content-list';

export const metadata: Metadata = {
	title: 'События',
	description:
		'Предстоящие и прошедшие события, конференции и мероприятия АСКП.',
	openGraph: { title: 'События | АСКП', url: '/events' },
};

const Page = () => {
	return <ContentList type='events' mode='all' />;
};

export default Page;
