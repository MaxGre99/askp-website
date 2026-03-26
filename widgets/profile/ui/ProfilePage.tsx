'use client';

import { useRedirectToast } from '@/shared/hooks/useRedirectToast';

import { ProfileForm } from './ProfileForm';

export const ProfilePage = () => {
	useRedirectToast();
	return (
		<div className='w-full flex flex-col gap-6 justify-center'>
			<ProfileForm />
		</div>
	);
};
