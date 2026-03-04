'use client';

import { useState } from 'react';

import { useAvatarUpload } from '../model/useAvatarUpload';

import { AvatarEditorModal } from './AvatarEditorModal';
import { AvatarUploadBlock } from './AvatarUploadBlock';

export const AvatarUploadWithModal = ({ userId }: { userId?: string }) => {
	const { onSelectFile } = useAvatarUpload(userId);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleFileSelect = (file: File) => {
		setSelectedFile(file);
		setIsModalOpen(true); // открываем модалку
	};

	const handleSave = (croppedBlob: Blob) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onSelectFile(croppedBlob as any); // сохраняем через хук
		setIsModalOpen(false);
		setSelectedFile(null);
	};

	return (
		<>
			<AvatarUploadBlock userId={userId} onSelectFile={handleFileSelect} />
			<AvatarEditorModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				image={selectedFile}
				onSave={handleSave}
			/>
		</>
	);
};
