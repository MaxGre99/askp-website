'use client';

import { ErrorMessage, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useUploadProductImageMutation } from '@/entities/product-images';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { Loader } from '@/shared/ui/Loader';

import { useEditProductForm } from '../model/useEditProductForm';

import { ProductCoversInput } from './ProductCoversInput';

export const EditProductForm = () => {
	const { t } = useTranslation();

	const { initialValues, schema, handleSubmit, trackUploadedUrl, isLoading } =
		useEditProductForm();

	const [uploadProductImage] = useUploadProductImageMutation();

	const handleUploadProductImage = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadProductImage(formData).unwrap();
		trackUploadedUrl(url);
		return url;
	};

	if (isLoading) return <Loader />;

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			{({ values, setFieldValue, isSubmitting, touched, errors }) => (
				<Form className='flex flex-col gap-6 max-w-4xl mx-auto items-stretch'>
					<FormField
						name='name'
						label={t('labels.name')}
						placeholder={t('placeholders.name')}
						required
						labelClassname='text-[16px]'
					/>
					<FormField
						name='contentLink'
						label={t('labels.contentLink')}
						placeholder='https://...'
						required
						labelClassname='text-[16px]'
					/>
					<FormField
						name='price'
						label={`${t('labels.price')} (₽)`}
						type='number'
						placeholder='1500'
						required
						labelClassname='text-[16px]'
					/>

					<ProductCoversInput />

					<div className='flex flex-col'>
						<label className='mb-1'>
							{t('labels.description')}
							<span className='text-red-500'>*</span>
						</label>
						<FormikTipTapField
							name='description'
							onUploadImage={handleUploadProductImage}
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
						{t('labels.publish')}
					</label>

					<button
						type='submit'
						disabled={isSubmitting}
						className='bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 active:bg-blue-400 disabled:opacity-50 self-start'
					>
						{isSubmitting ? t('buttons.saving') : t('buttons.saveChanges')}
					</button>
				</Form>
			)}
		</Formik>
	);
};
