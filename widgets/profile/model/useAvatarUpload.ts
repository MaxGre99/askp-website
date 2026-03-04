'use client';

import { useState } from 'react';

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
			alert('Разрешены только JPG, PNG и WebP');
			return;
		}

		if (file.size > MAX_SIZE) {
			alert('Максимальный размер 3MB');
			return;
		}

		try {
			const formData = new FormData();
			formData.append('file', file);
			await uploadAvatar(formData).unwrap();
			setSelectedFile(null);
		} catch (e) {
			console.error(e);
			alert('Ошибка загрузки аватара');
		}
	};

	return {
		avatar,
		onSelectFile,
		isUploading: isLoading,
		selectedFile,
	};
};
