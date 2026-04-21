'use client';

import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useGetAvatarQuery, useUploadAvatarMutation } from '@/entities/avatars';
import { handleApiError } from '@/shared/lib/helpers';

const MAX_SIZE = 3 * 1024 * 1024;

export const useAvatarUpload = (userId?: string) => {
	const { t } = useTranslation();

	const { data: avatar } = useGetAvatarQuery(userId as string, {
		skip: !userId,
	});

	const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const onSelectFile = async (file: File) => {
		if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
			toast(t('errors.incorrectFileType'), { type: 'warning' });
			return;
		}

		if (file.size > MAX_SIZE) {
			toast(t('errors.fileTooLarge'), { type: 'warning' });
			return;
		}

		try {
			const formData = new FormData();
			formData.append('file', file);
			await uploadAvatar(formData).unwrap();
			setSelectedFile(null);
		} catch (e) {
			handleApiError(e);
			// console.error(e);
			// toast(t('errors.avatarUploadFailed'), { type: 'error' });
		}
	};

	return {
		avatar,
		onSelectFile,
		isUploading: isLoading,
		selectedFile,
	};
};
