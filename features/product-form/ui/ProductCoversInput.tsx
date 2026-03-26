'use client';

import { useRef, useState } from 'react';

import { FieldArray, useField } from 'formik';

import {
	useDeleteProductCoverMutation,
	useUploadProductCoverMutation,
} from '@/entities/product-images';

const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL;

const ImageRow = ({
	value,
	index,
	onChange,
	onRemove,
}: {
	value: string;
	index: number;
	onChange: (i: number, url: string) => void;
	onRemove: (i: number) => void;
}) => {
	const [mode, setMode] = useState<'url' | 'upload'>(value ? 'url' : 'url');
	const [uploading, setUploading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [uploadProductCover] = useUploadProductCoverMutation();
	const [deleteProductCover] = useDeleteProductCoverMutation();

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			if (value && value.startsWith(MINIO_PUBLIC_URL!)) {
				await deleteProductCover(value).unwrap().catch(console.error);
			}
			const formData = new FormData();
			formData.append('file', file);
			const { url } = await uploadProductCover(formData).unwrap();
			onChange(index, url);
			setMode('url');
		} finally {
			setUploading(false);
		}
	};

	const handleDelete = async () => {
		if (value && value.startsWith(MINIO_PUBLIC_URL!)) {
			await deleteProductCover(value).unwrap().catch(console.error);
		}
		onRemove(index);
	};

	return (
		<div className='flex flex-col gap-2 p-3 border border-gray-200 rounded-xl'>
			<div className='flex gap-1 text-sm'>
				<button
					type='button'
					onClick={() => setMode('url')}
					className={`px-3 py-1 rounded-lg ${mode === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
				>
					По URL
				</button>
				<button
					type='button'
					onClick={() => setMode('upload')}
					className={`px-3 py-1 rounded-lg ${mode === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
				>
					Загрузить
				</button>
				<button
					type='button'
					onClick={handleDelete}
					className='ml-auto text-red-500 hover:text-red-700 px-2 text-xs'
				>
					Удалить
				</button>
			</div>

			{mode === 'url' ? (
				<input
					value={value}
					onChange={(e) => onChange(index, e.target.value)}
					placeholder='https://...'
					className='border border-gray-300 rounded-lg px-3 py-2 w-full text-sm'
				/>
			) : (
				<div
					onClick={() => inputRef.current?.click()}
					className='border-2 border-dashed border-gray-300 rounded-lg px-3 py-4 text-center text-gray-500 cursor-pointer hover:border-blue-400 text-sm'
				>
					{uploading ? 'Загружается...' : 'Нажмите чтобы выбрать файл'}
					<input
						ref={inputRef}
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleFileChange}
					/>
				</div>
			)}

			{value && (
				<img
					src={value}
					alt={`preview-${index}`}
					className='w-full object-fill rounded-lg'
				/>
			)}
		</div>
	);
};

export const ProductCoversInput = () => {
	const [field, , helpers] = useField<string[]>('images');

	return (
		<div className='flex flex-col gap-2'>
			<label className='font-bold'>Изображения для слайдера</label>
			<FieldArray name='images'>
				{({ push, remove }) => (
					<div className='flex flex-col gap-3'>
						{field.value.map((img, i) => (
							<ImageRow
								key={i}
								value={img}
								index={i}
								onChange={(idx, url) => {
									const next = [...field.value];
									next[idx] = url;
									helpers.setValue(next);
								}}
								onRemove={remove}
							/>
						))}
						<button
							type='button'
							onClick={() => push('')}
							className='self-start text-sm text-blue-500 hover:text-blue-700'
						>
							+ Добавить изображение
						</button>
					</div>
				)}
			</FieldArray>
		</div>
	);
};
