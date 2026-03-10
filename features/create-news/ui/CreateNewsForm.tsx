'use client';

import { Form, Formik } from 'formik';

import { useUploadNewsImageMutation } from '@/entities/news-images';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';

import { useCreateNewsForm } from '../model/useCreateNewsForm';

export const CreateNewsForm = () => {
	const { initialValues, schema, handleSubmit } = useCreateNewsForm();
	const [uploadNewsImage] = useUploadNewsImageMutation();

	const handleUploadImage = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadNewsImage(formData).unwrap();
		return url;
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
		>
			{({ values, setFieldValue }) => (
				<Form className='flex flex-col gap-6 max-w-4xl mx-auto items-stretch'>
					<FormField
						name='title'
						label='Заголовок'
						placeholder='Введите заголовок новости'
					/>

					<FormField
						name='image'
						label='Обложка (URL)'
						placeholder='https://...'
					/>

					<div className='flex flex-col'>
						<label className='font-bold mb-2'>Содержание:</label>
						<FormikTipTapField
							name='content'
							onUploadImage={handleUploadImage}
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
						className='bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 active:bg-blue-400 self-start'
					>
						Создать новость
					</button>
				</Form>
			)}
		</Formik>
	);
};
