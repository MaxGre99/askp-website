'use client';

import { Form, Formik } from 'formik';

import {
	useDeleteArticleCoverMutation,
	useUploadArticleCoverMutation,
	useUploadArticleImageMutation,
} from '@/entities/article-images';
import { useGetMeQuery } from '@/entities/users';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { ImageInput } from '@/shared/ui/ImageInput';

import { useCreateArticleForm } from '../model/useCreateArticleForm';

export const CreateArticleForm = () => {
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
			{({ values, setFieldValue, isSubmitting /* , errors */ }) => (
				<Form className='flex flex-col gap-6 max-w-4xl mx-auto items-stretch'>
					<FormField
						name='title'
						label='Заголовок'
						placeholder='Введите заголовок статьи'
						required
					/>

					<ImageInput
						name='image'
						label='Обложка'
						onUpload={handleUploadCover}
						onDelete={handleDeleteCover}
					/>

					<div className='flex flex-col'>
						<label className='mb-2'>
							Содержание<span className='text-red-500'>*</span>
						</label>
						<FormikTipTapField
							name='content'
							onUploadImage={handleUploadImage}
						/>
					</div>

					{isAdmin ? (
						<label className='flex items-center gap-2 cursor-pointer'>
							<input
								type='checkbox'
								checked={values.published}
								onChange={(e) => setFieldValue('published', e.target.checked)}
							/>
							Опубликовать сразу
						</label>
					) : (
						<p className='italic text-gray-600'>
							Статья будет опубликована после одобрения администрацией.
						</p>
					)}

					<button
						type='submit'
						disabled={isSubmitting}
						className='bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 active:bg-blue-400 disabled:opacity-50 self-start'
					>
						{isSubmitting ? 'Сохранение...' : 'Создать статью'}
					</button>
					{/* {errors && <p>{Object.values(errors)}</p>} */}
				</Form>
			)}
		</Formik>
	);
};
