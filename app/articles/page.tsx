import { Suspense } from 'react';
import { Metadata } from 'next';

import { Loader } from '@/shared/ui/Loader';
import { ContentList } from '@/widgets/content-list';

export const metadata: Metadata = {
	title: 'Статьи',
	description:
		'Профессиональные статьи специалистов АСКП по психологии и психотерапии.',
	openGraph: { title: 'Статьи | АСКП', url: '/articles' },
};

const Page = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ContentList type='articles' mode='all' />
		</Suspense>
	);
};

export default Page;
