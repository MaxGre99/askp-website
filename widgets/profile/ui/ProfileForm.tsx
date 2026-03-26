'use client';

import { Formik } from 'formik';
import { Form } from 'formik';

import { Loader } from '@/shared/ui/Loader';

import { useProfileForm } from '../model/useProfileForm';

import { ProfileActions } from './ProfileActions';
import { ProfileBioSection } from './ProfileBioSection';
import { ProfileContactsBlock } from './ProfileContactsBlock';
import { ProfileMainBlock } from './ProfileMainBlock';

export const ProfileForm = () => {
	const {
		profile,
		initialValues,
		schema,
		isEditing,
		setIsEditing,
		handleSubmit,
		loading,
	} = useProfileForm();

	if (loading) return <Loader />;

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			enableReinitialize
			onSubmit={handleSubmit}
		>
			{({ touched, errors }) => (
				<Form className='flex flex-col gap-6'>
					<ProfileMainBlock profile={profile} isEditing={isEditing} />

					<ProfileBioSection
						profile={profile}
						isEditing={isEditing}
						hasErrorsFullBio={!!(errors.fullBio && touched.fullBio)}
					/>

					<ProfileContactsBlock profile={profile} isEditing={isEditing} />

					<ProfileActions isEditing={isEditing} setIsEditing={setIsEditing} />
				</Form>
			)}
		</Formik>
	);
};
