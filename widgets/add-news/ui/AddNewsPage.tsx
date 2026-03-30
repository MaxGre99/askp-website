'use client';

import { useTranslation } from 'react-i18next';

import { CreateNewsForm } from '@/features/news-form';

export const AddNewsPage = () => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>{t('buttons.addNews')}</h1>
			<CreateNewsForm />
		</div>
	);
};
