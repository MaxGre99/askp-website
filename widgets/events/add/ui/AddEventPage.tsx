'use client';

import { useTranslation } from 'react-i18next';

import { CreateEventForm } from '@/features/event-form';

export const AddEventPage = () => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>{t('buttons.addEvent')}</h1>
			<CreateEventForm />
		</div>
	);
};
