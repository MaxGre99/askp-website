'use client';

import { useTranslation } from 'react-i18next';

import { CreateArticleForm } from '@/features/article-form';

export const AddArticlePage = () => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>{t('buttons.addArticle')}</h1>
			<CreateArticleForm />
		</div>
	);
};
