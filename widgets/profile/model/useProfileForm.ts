import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useDeleteProfileBioImageMutation } from '@/entities/profile-bio-images';
import {
	useGetMyProfileQuery,
	useUpdateProfileMutation,
} from '@/entities/profiles';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { formatDateForInput } from '@/shared/lib/formatDateForInput';
import { handleApiError } from '@/shared/lib/handleApiError';
import { localDateToISO } from '@/shared/lib/localDateToISO';
import { trimStrings } from '@/shared/lib/trimStrings';

import { editProfileSchema } from './schema';

export const useProfileForm = () => {
	const { t } = useTranslation();
	const { data: profile, isLoading, isError, error } = useGetMyProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();
	const [deleteProfileBioImage] = useDeleteProfileBioImageMutation();

	const [isEditing, setIsEditing] = useState(false);

	const schema = editProfileSchema(t);

	const initialValues = {
		firstName: profile?.firstName ?? '',
		lastName: profile?.lastName ?? '',
		middleName: profile?.middleName ?? '',
		displayName: profile?.displayName ?? '',
		gender: profile?.gender ?? null,
		city: profile?.city ?? '',
		maritalStatus: profile?.maritalStatus ?? null,
		languages: profile?.languages ?? [],
		birthDate: formatDateForInput(profile?.birthDate),
		shortBio: profile?.shortBio ?? '',
		fullBio: profile?.fullBio ?? '',
		phone: profile?.phone ?? '',
		telegramUser: profile?.telegramUser ?? '',
		telegramChannel: profile?.telegramChannel ?? '',
		vkUrl: profile?.vkUrl ?? '',
		website: profile?.website ?? '',
		phoneRefs: profile?.phoneRefs ?? [],
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (values: any) => {
		try {
			const trimmed = trimStrings(values);
			const submitValues = {
				...trimmed,
				birthDate: trimmed.birthDate ? localDateToISO(trimmed.birthDate) : null,
			};

			await updateProfile(submitValues).unwrap();

			// Удаляем изображения, которые пропали из редактора
			const oldUrls = extractImageUrls(initialValues.fullBio ?? '');
			const newUrls = extractImageUrls(values.fullBio ?? '');
			const removedUrls = oldUrls.filter(
				(url) =>
					!newUrls.includes(url) &&
					url.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!),
			);

			await Promise.allSettled(
				removedUrls.map((url) => deleteProfileBioImage(url)),
			);

			setIsEditing(false);
		} catch (err) {
			handleApiError(err);
		}
	};

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	return {
		profile,
		initialValues,
		schema,
		handleSubmit,
		isEditing,
		setIsEditing,
		loading: isLoading,
	};
};
