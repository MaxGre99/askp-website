import { Suspense } from 'react';
import { Metadata } from 'next';

import { Loader } from '@/shared/ui/Loader';
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
	return (
		<Suspense fallback={<Loader />}>
			<ContentList type='news' mode='all' />
		</Suspense>
	);
};

export default Page;
