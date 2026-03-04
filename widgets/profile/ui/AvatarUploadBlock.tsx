'use client';

import { useRef } from 'react';

import { Avatar } from '@/entities/avatars';
import { BaseButton } from '@/shared/ui/BaseButton';

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
			<div className='rounded-md bg-gray-100 w-[256px] h-[256px] flex items-center justify-center border border-gray-400 overflow-hidden'>
				<Avatar src={avatar?.url} />
			</div>

			<BaseButton
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
			</BaseButton>
		</div>
	);
};
