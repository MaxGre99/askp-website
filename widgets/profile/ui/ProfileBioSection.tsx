'use client';

import clsx from 'clsx';

import { Profile } from '@/entities/profiles';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

interface Props {
	profile?: Profile;
	isEditing: boolean;
}

export const ProfileBioSection = ({ profile, isEditing }: Props) => {
	return (
		<>
			<div className='flex flex-col gap-2 w-full'>
				<label className='font-bold'>Коротко о себе:</label>
				{isEditing ? (
					<FormField<Profile>
						name='shortBio'
						as='textarea'
						className='min-h-[90px]'
					/>
				) : (
					<div>{profile?.shortBio || '—'}</div>
				)}
			</div>

			<div className={clsx('flex flex-col w-full')}>
				<label className='font-bold mb-2'>Подробно о себе:</label>
				{isEditing ? (
					<FormikTipTapField name='fullBio' />
				) : (
					<TipTapReadOnly content={profile?.fullBio || ''} />
				)}
			</div>
		</>
	);
};
