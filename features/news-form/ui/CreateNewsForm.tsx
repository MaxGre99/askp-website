'use client';

import { ErrorMessage, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import {
	useDeleteNewsCoverMutation,
	useUploadNewsCoverMutation,
	useUploadNewsImageMutation,
} from '@/entities/news-images';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { ImageInput } from '@/shared/ui/ImageInput';

import { useCreateNewsForm } from '../model/useCreateNewsForm';

export const CreateNewsForm = () => {
	const { t } = useTranslation();

	const { initialValues, schema, handleSubmit, trackUploadedUrl } =
		useCreateNewsForm();

	const [uploadNewsImage] = useUploadNewsImageMutation();
	const [uploadNewsCover] = useUploadNewsCoverMutation();
	const [deleteNewsCover] = useDeleteNewsCoverMutation();

	const handleUploadImage = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadNewsImage(formData).unwrap();
		trackUploadedUrl(url);
		return url;
	};

	const handleUploadCover = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadNewsCover(formData).unwrap();
		return url;
	};

	const handleDeleteCover = async (url: string) => {
		await deleteNewsCover(url);
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

					<ImageInput
						name='image'
						label={t('labels.cover')}
						onUpload={handleUploadCover}
						onDelete={handleDeleteCover}
					/>

					<div className='flex flex-col'>
						<label className='mb-1'>
							{t('labels.content')}
							<span className='text-red-500'>*</span>
						</label>
						<FormikTipTapField
							name='content'
							onUploadImage={handleUploadImage}
							hasError={!!(errors.content && touched.content)}
						/>
						<ErrorMessage name='content' component='p' className='error mt-2' />
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
