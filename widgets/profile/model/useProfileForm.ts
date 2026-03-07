import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '@/entities/profiles';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { formatDateForInput } from '@/shared/lib/formatDateForInput';

import { editProfileSchema } from './schema';

export const useProfileForm = () => {
	const { t } = useTranslation();
	const { data: profile, isLoading } = useGetProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();

	const [isEditing, setIsEditing] = useState(false);

	const schema = editProfileSchema(t);

	const initialValues = {
		firstName: profile?.firstName ?? '',
		lastName: profile?.lastName ?? '',
		middleName: profile?.middleName ?? '',
		displayName: profile?.displayName ?? '',
		gender: profile?.gender ?? null,
		maritalStatus: profile?.maritalStatus ?? null,
		languages: profile?.languages ?? [],
		birthDate: formatDateForInput(profile?.birthDate),
		shortBio: profile?.shortBio ?? '',
		fullBio: profile?.fullBio ?? '',
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (values: any) => {
		const submitValues = {
			...values,
			birthDate: values.birthDate
				? new Date(values.birthDate).toISOString()
				: null,
		};

		await updateProfile(submitValues).unwrap();

		// Удаляем изображения, которые пропали из редактора
		const oldUrls = extractImageUrls(initialValues.fullBio ?? '');
		const newUrls = extractImageUrls(values.fullBio ?? '');
		const removedUrls = oldUrls.filter((url) => !newUrls.includes(url));

		await Promise.allSettled(
			removedUrls.map((url) =>
				fetch('/api/profile-bio-images/delete', {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ url }),
				}),
			),
		);

		setIsEditing(false);
	};

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
