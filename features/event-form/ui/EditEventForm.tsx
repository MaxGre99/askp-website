'use client';

import { Form, Formik } from 'formik';

import {
	useDeleteEventCoverMutation,
	useUploadEventCoverMutation,
	useUploadEventImageMutation,
} from '@/entities/event-images';
import { FormField } from '@/shared/ui/FormField';
import { FormikTipTapField } from '@/shared/ui/FormikTipTapField';
import { ImageInput } from '@/shared/ui/ImageInput';

import { useEditEventForm } from '../model/useEditEventForm';

export const EditEventForm = () => {
	const { initialValues, schema, handleSubmit, trackUploadedUrl, isLoading } =
		useEditEventForm();
	const [uploadEventImage] = useUploadEventImageMutation();
	const [uploadEventCover] = useUploadEventCoverMutation();
	const [deleteEventCover] = useDeleteEventCoverMutation();

	const handleUploadImage = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadEventImage(formData).unwrap();
		trackUploadedUrl(url);
		return url;
	};

	const handleUploadCover = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadEventCover(formData).unwrap();
		return url;
	};

	const handleDeleteCover = async (url: string) => {
		await deleteEventCover(url);
	};

	if (isLoading) return <div>Загрузка...</div>;

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
			enableReinitialize // ← важно: подхватывает initialValues когда news загрузится
		>
			{({ values, setFieldValue, isSubmitting /* , errors */ }) => (
				<Form className='flex flex-col gap-6 max-w-4xl mx-auto items-stretch'>
					<FormField
						name='title'
						label='Заголовок'
						placeholder='Введите заголовок события'
					/>

					<FormField
						name='eventDate'
						label='Дата события'
						type='datetime-local'
					/>

					<ImageInput
						name='image'
						label='Обложка'
						onUpload={handleUploadCover}
						onDelete={handleDeleteCover}
					/>

					<div className='flex flex-col'>
						<label className='font-bold mb-2'>Описание:</label>
						<FormikTipTapField
							name='description'
							onUploadImage={handleUploadImage}
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
					{/* {errors && <p>{Object.values(errors)}</p>} */}
				</Form>
			)}
		</Formik>
	);
};
