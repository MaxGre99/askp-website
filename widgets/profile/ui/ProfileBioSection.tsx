'use client';

import dynamic from 'next/dynamic';

import { Profile } from '@/entities/profiles';
import { FormField } from '@/shared/ui/FormField';
import { FormikQuillField } from '@/shared/ui/FormikQuillField';

const ReactQuill = dynamic(() => import('react-quill-new'), {
	ssr: false,
});

interface Props {
	profile?: Profile;
	isEditing: boolean;
}

export const ProfileBioSection = ({ profile, isEditing }: Props) => {
	return (
		<>
			<div className='flex flex-col gap-2'>
				<label className='font-bold'>Коротко о себе:</label>
				{isEditing ? (
					<FormField<Profile>
						name='shortBio'
						as='textarea'
						className='w-full min-h-[90px]'
					/>
				) : (
					<div>{profile?.shortBio || '—'}</div>
				)}
			</div>

			{isEditing ? (
				<FormikQuillField name='fullBio' label='Подробно о себе' />
			) : (
				<div>
					<label className='font-bold'>Подробно о себе:</label>
					<ReactQuill
						theme='snow'
						value={profile?.fullBio || ''}
						readOnly
						modules={{ toolbar: false }}
					/>
				</div>
			)}
		</>
	);
};
