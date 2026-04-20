import { Suspense } from 'react';
import { Metadata } from 'next';

import { Loader } from '@/shared/ui/Loader';
import { ContentList } from '@/widgets/content-list';

export const metadata: Metadata = {
	title: 'События',
	description:
		'Предстоящие и прошедшие события, конференции и мероприятия АСКП.',
	openGraph: { title: 'События | АСКП', url: '/events' },
};

const Page = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ContentList type='events' mode='all' />
		</Suspense>
	);
};

export default Page;
