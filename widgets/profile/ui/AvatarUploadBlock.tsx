'use client';

import { useRef } from 'react';

import { Avatar } from '@/entities/avatars';
import { Button } from '@/shared/ui/Button';

import { useAvatarUpload } from '../model/useAvatarUpload';

export const AvatarUploadBlock = ({
	userId,
	onSelectFile,
}: {
	userId?: string;
	onSelectFile: (file: File) => void;
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { avatar, isUploading } = useAvatarUpload(userId);

	return (
		<div className='flex flex-col gap-6'>
			<div className='rounded-md bg-gray-50 w-[256px] h-[256px] flex items-center justify-center border border-gray-200 overflow-hidden'>
				<Avatar src={avatar?.url} />
			</div>

			<Button
				disabled={isUploading}
				onClick={() => fileInputRef.current?.click()}
			>
				<input
					ref={fileInputRef}
					type='file'
					accept='image/jpeg,image/png,image/webp'
					className='hidden'
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) onSelectFile(file);
					}}
				/>
				+ Добавить фото
			</Button>
		</div>
	);
};
