'use client';

import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import {
	useDeleteDonaterCoverMutation,
	useUploadDonaterCoverMutation,
} from '@/entities/donater-covers';
import { FormField } from '@/shared/ui/FormField';
import { ImageInput } from '@/shared/ui/ImageInput';

interface Props {
	title: string;
	initialValues: { name: string; description: string; image: string };
	schema: Yup.ObjectSchema<
		{
			name: string;
			description: string | null | undefined;
			image: string | null | undefined;
		},
		Yup.AnyObject,
		{
			name: undefined;
			description: undefined;
			image: undefined;
		},
		''
	>;
	handleSubmit: (values: {
		name: string;
		description: string;
		image: string;
	}) => Promise<void>;
	submitLabel: string;
	enableReinitialize?: boolean;
}

export const DonaterFormFields = ({
	title,
	initialValues,
	schema,
	handleSubmit,
	submitLabel,
	enableReinitialize,
}: Props) => {
	const { t } = useTranslation();

	const [uploadDonaterImage] = useUploadDonaterCoverMutation();
	const [deleteDonaterImage] = useDeleteDonaterCoverMutation();

	const handleUploadDonaterCover = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { url } = await uploadDonaterImage(formData).unwrap();
		return url;
	};

	const handleDeleteDonaterCover = async (url: string) => {
		await deleteDonaterImage(url);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
			enableReinitialize={enableReinitialize}
		>
			{({ isSubmitting }) => (
				<Form className='flex flex-col gap-6 max-w-2xl w-full'>
					<h1 className='text-2xl font-bold'>{title}</h1>
					<FormField
						name='name'
						label={t('labels.name')}
						placeholder={t('placeholders.name')}
						required
						labelClassname='text-[16px]'
					/>
					<FormField
						name='description'
						label={t('labels.description')}
						placeholder={t('placeholders.description')}
						as='textarea'
						className='min-h-[90px]'
						labelClassname='text-[16px]'
					/>
					<ImageInput
						name='image'
						label={t('labels.cover')}
						onUpload={handleUploadDonaterCover}
						onDelete={handleDeleteDonaterCover}
					/>
					<button
						type='submit'
						disabled={isSubmitting}
						className='bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 disabled:opacity-50 self-start'
					>
						{isSubmitting ? t('buttons.saving') : submitLabel}
					</button>
				</Form>
			)}
		</Formik>
	);
};
