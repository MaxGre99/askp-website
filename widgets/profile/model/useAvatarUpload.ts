'use client';

import { useState } from 'react';

import { toast } from 'react-toastify';

import { useGetAvatarQuery, useUploadAvatarMutation } from '@/entities/avatars';

const MAX_SIZE = 3 * 1024 * 1024;

export const useAvatarUpload = (userId?: string) => {
	const { data: avatar } = useGetAvatarQuery(userId as string, {
		skip: !userId,
	});

	const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const onSelectFile = async (file: File) => {
		if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
			toast('Разрешены только JPG, PNG и WebP', { type: 'warning' });
			return;
		}

		if (file.size > MAX_SIZE) {
			toast('Максимальный размер 3MB', { type: 'warning' });
			return;
		}

		try {
			const formData = new FormData();
			formData.append('file', file);
			await uploadAvatar(formData).unwrap();
			setSelectedFile(null);
		} catch (e) {
			console.error(e);
			toast('Ошибка загрузки аватара', { type: 'error' });
		}
	};

	return {
		avatar,
		onSelectFile,
		isUploading: isLoading,
		selectedFile,
	};
};
