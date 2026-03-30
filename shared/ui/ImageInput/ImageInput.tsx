'use client';

import { useRef, useState } from 'react';

import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

interface Props {
	name: string;
	label: string;
	onUpload: (file: File) => Promise<string>;
	onDelete?: (url: string) => Promise<void>;
}

const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL;

export const ImageInput = ({ name, label, onUpload, onDelete }: Props) => {
	const { t } = useTranslation();

	const [field, , helpers] = useField(name);
	const [mode, setMode] = useState<'url' | 'upload'>('url');
	const [uploading, setUploading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			// Удаляем старую обложку если она с нашего сервера
			const prevUrl = field.value;
			if (onDelete && prevUrl && prevUrl.startsWith(MINIO_PUBLIC_URL)) {
				await onDelete(prevUrl);
			}

			const url = await onUpload(file);
			helpers.setValue(url);
		} finally {
			setUploading(false);
		}
	};

	const handleDeleteCover = async () => {
		const currentUrl = field.value;
		helpers.setValue('');
		// Удаляем с сервера только если это не внешний URL
		if (onDelete && currentUrl.startsWith(MINIO_PUBLIC_URL)) {
			await onDelete(currentUrl);
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center justify-between'>
				<label>{label}</label>
				<div className='flex gap-1 text-sm'>
					<button
						type='button'
						onClick={() => setMode('url')}
						className={`px-3 py-1 rounded-lg ${mode === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
					>
						{t('buttons.byUrl')}
					</button>
					<button
						type='button'
						onClick={() => setMode('upload')}
						className={`px-3 py-1 rounded-lg ${mode === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
					>
						{t('buttons.byFile')}
					</button>
				</div>
			</div>

			{mode === 'url' ? (
				<input
					type='text'
					value={field.value}
					onChange={(e) => helpers.setValue(e.target.value)}
					placeholder='https://...'
					className='border border-gray-300 rounded-lg px-3 py-2 w-full'
				/>
			) : (
				<div
					onClick={() => inputRef.current?.click()}
					className='border-2 border-dashed border-gray-300 rounded-lg px-3 py-6 text-center text-gray-500 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors'
				>
					{uploading ? t('buttons.loading') : t('buttons.pressToChoseFile')}
					<input
						ref={inputRef}
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleFileChange}
					/>
				</div>
			)}

			{field.value && (
				<div className='relative w-full'>
					<img
						src={field.value}
						alt='preview'
						className='w-full object-fill rounded-lg'
					/>
					<button
						type='button'
						onClick={handleDeleteCover}
						className='absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/80 text-xs'
					>
						✕
					</button>
				</div>
			)}
		</div>
	);
};
