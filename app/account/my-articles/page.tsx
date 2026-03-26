'use client';

import { useRedirectToast } from '@/shared/hooks/useRedirectToast';
import { ContentList } from '@/widgets/content-list';

const Page = () => {
	useRedirectToast();
	return <ContentList type='articles' mode='my' />;
};

export default Page;
