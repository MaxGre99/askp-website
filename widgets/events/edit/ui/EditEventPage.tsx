'use client';

import { useTranslation } from 'react-i18next';

import { EditEventForm } from '@/features/event-form';

export const EditEventPage = () => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>{t('buttons.editevents')}</h1>
			<EditEventForm />
		</div>
	);
};
