import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useDeleteDonaterCoverMutation } from '@/entities/donater-covers';
import {
	useGetDonaterQuery,
	useUpdateDonaterMutation,
} from '@/entities/donaters';
import { handleApiError } from '@/shared/lib/handleApiError';
import { trimStrings } from '@/shared/lib/trimStrings';

import { createDonaterSchema } from './schema';

export const useEditDonaterForm = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const router = useRouter();
	const {
		data: donater,
		isLoading,
		isError,
		error,
	} = useGetDonaterQuery(id as string);
	const [updateDonater] = useUpdateDonaterMutation();
	const [deleteDonaterCover] = useDeleteDonaterCoverMutation();

	const initialValues = {
		name: donater?.name ?? '',
		description: donater?.description ?? '',
		image: donater?.image ?? '',
	};

	const schema = createDonaterSchema(t);

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			const oldImage = donater?.image;
			const newImage = trimmed.image || null;

			if (
				oldImage &&
				oldImage !== newImage &&
				oldImage.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!)
			) {
				await deleteDonaterCover(oldImage).unwrap().catch(console.error);
			}

			await updateDonater({
				id: id as string,
				body: { ...trimmed, image: newImage },
			}).unwrap();

			router.push('/donate');
		} catch (err) {
			handleApiError(err);
		}
	};

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	return { initialValues, schema, handleSubmit, isLoading };
};
