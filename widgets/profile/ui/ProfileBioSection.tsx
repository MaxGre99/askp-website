'use client';

import clsx from 'clsx';
import { ErrorMessage } from 'formik';

import { useUploadProfileBioImageMutation } from '@/entities/profile-bio-images';
import { Profile } from '@/entities/profiles';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

interface Props {
	profile?: Profile;
	isEditing: boolean;
	hasErrorsFullBio: boolean;
}

export const ProfileBioSection = ({
	profile,
	isEditing,
	hasErrorsFullBio,
}: Props) => {
	const [uploadProfileBioImage] = useUploadProfileBioImageMutation();

	const handleUploadProfileBioImage = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadProfileBioImage(formData).unwrap();
		return url;
	};

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
					<>
						<FormikTipTapField
							name='fullBio'
							onUploadImage={handleUploadProfileBioImage}
							hasError={hasErrorsFullBio}
						/>
						<ErrorMessage name='fullBio' component='p' className='error mt-2' />
					</>
				) : (
					<TipTapReadOnly content={profile?.fullBio || ''} />
				)}
			</div>
		</>
	);
};
