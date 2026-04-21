'use client';

import { ErrorMessage, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { handleApiError } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { ImageInput } from '@/shared/ui/ImageInput';

import {
	useDeleteEventCoverMutation,
	useUploadEventCoverMutation,
	useUploadEventImageMutation,
} from '../api/eventImagesApi';
import { useCreateEventForm } from '../model/useCreateEventForm';

export const CreateEventForm = () => {
	const { t } = useTranslation();

	const { initialValues, schema, handleSubmit, trackUploadedUrl } =
		useCreateEventForm();

	const [uploadEventImage] = useUploadEventImageMutation();
	const [uploadEventCover] = useUploadEventCoverMutation();
	const [deleteEventCover] = useDeleteEventCoverMutation();

	const handleUploadImage = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			const { url } = await uploadEventImage(formData).unwrap();
			trackUploadedUrl(url);
			return url;
		} catch (err) {
			handleApiError(err);
			return '';
		}
	};

	const handleUploadCover = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			const { url } = await uploadEventCover(formData).unwrap();
			return url;
		} catch (err) {
			handleApiError(err);
			return '';
		}
	};

	const handleDeleteCover = async (url: string) => {
		try {
			await deleteEventCover(url);
		} catch (err) {
			handleApiError(err);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
		>
			{({ values, setFieldValue, isSubmitting, touched, errors }) => (
				<Form className='flex flex-col gap-6 max-w-4xl mx-auto items-stretch'>
					<FormField
						name='title'
						label={t('labels.title')}
						placeholder={t('placeholders.title')}
						required
						labelClassname='text-[16px]'
					/>

					<FormField
						name='eventDate'
						label={t('labels.eventDate')}
						type='datetime-local'
						required
						labelClassname='text-[16px]'
					/>

					<ImageInput
						name='image'
						label={t('labels.cover')}
						onUpload={handleUploadCover}
						onDelete={handleDeleteCover}
					/>

					<div className='flex flex-col'>
						<label className='mb-1'>
							{t('labels.description')}
							<span className='text-red-500'>*</span>
						</label>
						<FormikTipTapField
							name='description'
							onUploadImage={handleUploadImage}
							hasError={!!(errors.description && touched.description)}
						/>
						<ErrorMessage
							name='description'
							component='p'
							className='error mt-2'
						/>
					</div>

					<label className='flex items-center gap-2 cursor-pointer'>
						<input
							type='checkbox'
							checked={values.published}
							onChange={(e) => setFieldValue('published', e.target.checked)}
						/>
						{t('labels.instantPublish')}
					</label>

					<Button type='submit' disabled={isSubmitting} className='self-start'>
						{isSubmitting ? t('buttons.saving') : t('buttons.add')}
					</Button>
				</Form>
			)}
		</Formik>
	);
};
