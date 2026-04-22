'use client';

import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';

import { ProfileForm } from './ProfileForm';

export const ProfilePage = () => {
	const { t } = useTranslation();

	return (
		<div className='w-full flex flex-col gap-6 justify-center'>
			<div className='flex items-center gap-3 border rounded-2xl p-3 border-blue-500 bg-blue-50'>
				<FaInfoCircle size={32} className='text-blue-500' />
				<p>{t('labels.profileInstruction')}</p>
			</div>
			<ProfileForm />
		</div>
	);
};
