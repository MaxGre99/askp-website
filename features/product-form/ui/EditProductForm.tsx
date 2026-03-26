'use client';

import { Form, Formik } from 'formik';

import { useUploadProductImageMutation } from '@/entities/product-images';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { Loader } from '@/shared/ui/Loader';

import { useEditProductForm } from '../model/useEditProductForm';

import { ProductCoversInput } from './ProductCoversInput';

export const EditProductForm = () => {
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
			{({ values, setFieldValue, isSubmitting }) => (
				<Form className='flex flex-col gap-6 max-w-4xl mx-auto items-stretch'>
					<FormField
						name='name'
						label='Название'
						placeholder='Введите название'
					/>
					<FormField
						name='contentLink'
						label='Ссылка на курс'
						placeholder='https://...'
					/>
					<FormField
						name='price'
						label='Цена (₽)'
						type='number'
						placeholder='1500'
					/>

					<ProductCoversInput />

					<div className='flex flex-col'>
						<label className='font-bold mb-2'>Описание:</label>
						<FormikTipTapField
							name='description'
							onUploadImage={handleUploadProductImage}
						/>
					</div>

					<label className='flex items-center gap-2 cursor-pointer'>
						<input
							type='checkbox'
							checked={values.published}
							onChange={(e) => setFieldValue('published', e.target.checked)}
						/>
						Опубликовать
					</label>

					<button
						type='submit'
						disabled={isSubmitting}
						className='bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 active:bg-blue-400 disabled:opacity-50 self-start'
					>
						{isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
					</button>
				</Form>
			)}
		</Formik>
	);
};
