'use client';

import { ErrorMessage, Form, Formik } from 'formik';

import { useUploadProductImageMutation } from '@/entities/product-images';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';

import { useCreateProductForm } from '../model/useCreateProductForm';

import { ProductCoversInput } from './ProductCoversInput';

export const CreateProductForm = () => {
	const { initialValues, schema, handleSubmit, trackUploadedUrl } =
		useCreateProductForm();
	const [uploadProductImage] = useUploadProductImageMutation();

	const handleUploadProductImage = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadProductImage(formData).unwrap();
		trackUploadedUrl(url);
		return url;
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
						name='name'
						label='Название'
						placeholder='Введите название'
						required
					/>
					<FormField
						name='contentLink'
						label='Ссылка на курс'
						placeholder='https://...'
						required
					/>
					<FormField
						name='price'
						label='Цена (₽)'
						type='number'
						placeholder='1500'
						required
					/>

					<ProductCoversInput />

					<div className='flex flex-col'>
						<label className='mb-1'>
							Описание<span className='text-red-500'>*</span>
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
						Опубликовать сразу
					</label>

					<button
						type='submit'
						disabled={isSubmitting}
						className='bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 active:bg-blue-400 disabled:opacity-50 self-start'
					>
						{isSubmitting ? 'Сохранение...' : 'Создать товар'}
					</button>
				</Form>
			)}
		</Formik>
	);
};
