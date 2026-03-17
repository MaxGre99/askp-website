import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useDeleteDonaterCoverMutation } from '@/entities/donater-covers';
import {
	useGetDonaterQuery,
	useUpdateDonaterMutation,
} from '@/entities/donaters';

export const useEditDonaterForm = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const router = useRouter();
	const { data: donater, isLoading } = useGetDonaterQuery(id as string);
	const [updateDonater] = useUpdateDonaterMutation();
	const [deleteDonaterCover] = useDeleteDonaterCoverMutation();

	const schema = Yup.object({
		name: Yup.string().required(t('validationErrors.required.name')),
		description: Yup.string().required(
			t('validationErrors.required.description'),
		),
		image: Yup.string().nullable().optional(),
	});

	const initialValues = {
		name: donater?.name ?? '',
		description: donater?.description ?? '',
		image: donater?.image ?? '',
	};

	const handleSubmit = async (values: typeof initialValues) => {
		const oldImage = donater?.image;
		const newImage = values.image || null;

		if (
			oldImage &&
			oldImage !== newImage &&
			oldImage.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!)
		) {
			await deleteDonaterCover(oldImage).unwrap().catch(console.error);
		}

		await updateDonater({
			id: id as string,
			body: { ...values, image: newImage },
		}).unwrap();

		router.push('/donate');
	};

	return { initialValues, schema, handleSubmit, isLoading };
};
