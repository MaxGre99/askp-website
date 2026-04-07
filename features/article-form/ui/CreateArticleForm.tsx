'use client';

import { ErrorMessage, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useGetMeQuery } from '@/entities/users';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { ImageInput } from '@/shared/ui/ImageInput';

import {
	useDeleteArticleCoverMutation,
	useUploadArticleCoverMutation,
	useUploadArticleImageMutation,
} from '../api/articleImagesApi';
import { useCreateArticleForm } from '../model/useCreateArticleForm';

export const CreateArticleForm = () => {
	const { t } = useTranslation();

	const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
	const isAdmin = !isLoadingUser && user && user.role !== 'USER';

	const { initialValues, schema, handleSubmit, trackUploadedUrl } =
		useCreateArticleForm();

	const [uploadArticleImage] = useUploadArticleImageMutation();
	const [uploadArticleCover] = useUploadArticleCoverMutation();
	const [deleteArticleCover] = useDeleteArticleCoverMutation();

	const handleUploadImage = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadArticleImage(formData).unwrap();
		trackUploadedUrl(url);
		return url;
	};

	const handleUploadCover = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadArticleCover(formData).unwrap();
		return url;
	};

	const handleDeleteCover = async (url: string) => {
		await deleteArticleCover(url);
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
						placeholder={t('placeholders.articleTitle')}
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

					{isAdmin ? (
						<label className='flex items-center gap-2 cursor-pointer'>
							<input
								type='checkbox'
								checked={values.published}
								onChange={(e) => setFieldValue('published', e.target.checked)}
							/>
							{t('labels.instantPublish')}
						</label>
					) : (
						<p className='italic text-gray-600'>
							{t('labels.publishAfterApproval')}
						</p>
					)}

					<Button type='submit' disabled={isSubmitting} className='self-start'>
						{isSubmitting ? t('buttons.saving') : t('buttons.add')}
					</Button>
				</Form>
			)}
		</Formik>
	);
};
