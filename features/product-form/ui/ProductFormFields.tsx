'use client';

import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { FormField } from '@/shared/ui/FormField';

interface Props {
	title: string;
	initialValues: {
		name: string;
		description: string;
		contentLink: string;
		price: number;
		images: string[];
		published: boolean;
	};
	schema: Yup.AnyObjectSchema;
	handleSubmit: (values: {
		name: string;
		description: string;
		contentLink: string;
		price: number;
		images: string[];
		published: boolean;
	}) => Promise<void>;
	submitLabel: string;
	enableReinitialize?: boolean;
}

export const ProductFormFields = ({
	title,
	initialValues,
	schema,
	handleSubmit,
	submitLabel,
	enableReinitialize,
}: Props) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
			enableReinitialize={enableReinitialize}
		>
			{({ values, setFieldValue, isSubmitting }) => (
				<Form className='flex flex-col gap-6 max-w-2xl w-full'>
					<h1 className='text-2xl font-bold'>{title}</h1>

					<FormField
						name='name'
						label='Название'
						placeholder='Введите название'
					/>
					<FormField
						name='description'
						label='Описание'
						placeholder='Введите описание'
						as='textarea'
						className='min-h-[120px]'
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

					{/* Изображения */}
					<div className='flex flex-col gap-2'>
						<label className='font-bold'>Изображения (URL)</label>
						<FieldArray name='images'>
							{({ push, remove }) => (
								<div className='flex flex-col gap-2'>
									{values.images.map((img, i) => (
										<div key={i} className='flex gap-2'>
											<input
												value={img}
												onChange={(e) =>
													setFieldValue(`images.${i}`, e.target.value)
												}
												placeholder='https://...'
												className='border border-gray-300 rounded-lg px-3 py-2 flex-1'
											/>
											<button
												type='button'
												onClick={() => remove(i)}
												className='text-red-500 hover:text-red-700 px-2'
											>
												✕
											</button>
										</div>
									))}
									<button
										type='button'
										onClick={() => push('')}
										className='self-start text-sm text-blue-500 hover:text-blue-700'
									>
										+ Добавить изображение
									</button>
								</div>
							)}
						</FieldArray>
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
						className='bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 disabled:opacity-50 self-start'
					>
						{isSubmitting ? 'Сохранение...' : submitLabel}
					</button>
				</Form>
			)}
		</Formik>
	);
};
