import { Suspense } from 'react';

import { Loader } from '@/shared/ui/Loader';
import { ContentList } from '@/widgets/content-list';

const Page = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ContentList type='articles' mode='my' />
		</Suspense>
	);
};

export default Page;
