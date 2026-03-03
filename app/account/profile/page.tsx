'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import Select from 'react-select';

import {
	Profile,
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '@/entities/profiles';

// Quill динамически, чтобы не было SSR ошибок
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import {
	Avatar,
	useGetAvatarQuery,
	useUploadAvatarMutation,
} from '@/entities/avatars';
import { AvatarEditorModal } from '@/features/avatar-editor-modal';
import { BaseButton } from '@/shared/ui/BaseButton';

import 'react-quill-new/dist/quill.snow.css';

const genderOptions = [
	{ value: 'MALE', label: 'Мужской' },
	{ value: 'FEMALE', label: 'Женский' },
	{ value: 'OTHER', label: 'Другое' },
];

const maritalOptions = [
	{ value: 'SINGLE', label: 'Не женат/Не замужем' },
	{ value: 'MARRIED', label: 'Женат/Замужем' },
	{ value: 'DIVORCED', label: 'Разведен/Разведена' },
	{ value: 'WIDOWED', label: 'Вдовец/Вдова' },
];

const languageOptions = [
	{ value: 'ru', label: 'Русский' },
	{ value: 'en', label: 'Английский' },
	{ value: 'kg', label: 'Кыргызский' },
];

export default function ProfilePage() {
	const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();

	const { data: avatar } = useGetAvatarQuery(profile?.userId as string, {
		skip: !profile?.userId,
	});
	const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
	const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

	const [form, setForm] = useState<Partial<Profile>>({});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isEditorOpen, setIsEditorOpen] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (field: keyof Profile, value: any) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async () => {
		try {
			await updateProfile(form).unwrap();
			alert('Профиль обновлен!');
		} catch (err) {
			console.error(err);
			alert('Ошибка при обновлении');
		}
	};

	const MAX_SIZE = 3 * 1024 * 1024;

	const onSelectFile = (file: File) => {
		if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
			alert('Разрешены только JPG, PNG и WebP');
			return;
		}

		if (file.size > MAX_SIZE) {
			alert('Максимальный размер 3MB');
			return;
		}

		setSelectedFile(file);
		setIsEditorOpen(true);
	};

	const handleSaveCroppedImage = async (croppedBlob: Blob) => {
		try {
			// Создаем FormData и добавляем обрезанное изображение
			const formData = new FormData();

			// Конвертируем Blob в File с правильным именем
			const croppedFile = new File([croppedBlob], 'avatar.png', {
				type: 'image/png',
			});
			formData.append('file', croppedFile);

			// Загружаем на сервер
			await uploadAvatar(formData).unwrap();

			// Закрываем модалку и очищаем выбранный файл
			setIsEditorOpen(false);
			setSelectedFile(null);

			// Аватарка обновится автоматически через RTK Query
		} catch (e) {
			console.error('Upload failed', e);
			alert('Ошибка при загрузке аватара');
		}
	};

	useEffect(() => {
		const handleInitForm = async () => {
			if (profile) setForm(profile);
		};

		handleInitForm();
	}, [profile]);

	if (loadingProfile) return <div>Загрузка профиля...</div>;

	return (
		<div className='w-full flex flex-col items-stretch justify-start gap-6'>
			{/* Модальное окно редактора */}
			<AvatarEditorModal
				isOpen={isEditorOpen}
				onClose={() => {
					setIsEditorOpen(false);
					setSelectedFile(null);
					// Сбрасываем input, чтобы можно было выбрать тот же файл снова
					if (fileInputRef.current) {
						fileInputRef.current.value = '';
					}
				}}
				image={selectedFile}
				onSave={handleSaveCroppedImage}
			/>

			<div className='flex flex-row gap-6 items-center justify-between'>
				<div className='flex flex-col justify-start gap-6'>
					<div className='rounded-md bg-gray-100 min-w-[256px] min-h-[256px] w-[256px] h-[256px] flex items-center justify-center border-gray-400 border overflow-hidden'>
						<Avatar src={avatar?.url} />
					</div>
					<BaseButton
						disabled={isLoading}
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
				<div className='flex flex-1 flex-col items-stretch justify-between w-full h-full gap-2'>
					<input
						placeholder='Имя'
						value={form.firstName ?? ''}
						onChange={(e) => handleChange('firstName', e.target.value)}
						className='border p-2'
					/>
					<input
						placeholder='Фамилия'
						value={form.lastName ?? ''}
						onChange={(e) => handleChange('lastName', e.target.value)}
						className='border p-2'
					/>
					<input
						placeholder='Отчество'
						value={form.middleName ?? ''}
						onChange={(e) => handleChange('middleName', e.target.value)}
						className='border p-2'
					/>
					<input
						placeholder='Отображать как'
						value={form.displayName ?? ''}
						onChange={(e) => handleChange('displayName', e.target.value)}
						className='border p-2'
					/>

					<Select
						placeholder='Пол'
						options={genderOptions}
						value={
							genderOptions.find((opt) => opt.value === form.gender) || null
						}
						onChange={(opt) => handleChange('gender', opt?.value)}
					/>
					<Select
						placeholder='Семейное положение'
						options={maritalOptions}
						value={
							maritalOptions.find((opt) => opt.value === form.maritalStatus) ||
							null
						}
						onChange={(opt) => handleChange('maritalStatus', opt?.value)}
					/>
					<Select
						placeholder='Языки'
						options={languageOptions}
						isMulti
						value={languageOptions.filter((opt) =>
							(form.languages ?? []).includes(opt.value),
						)}
						onChange={(opts) =>
							handleChange(
								'languages',
								opts.map((o) => o.value),
							)
						}
					/>
					<input
						type='date'
						placeholder='Дата рождения'
						value={
							form.birthDate
								? new Date(form.birthDate).toISOString().split('T')[0]
								: ''
						}
						onChange={(e) => handleChange('birthDate', e.target.value)}
						className='border p-2'
					/>
				</div>
			</div>

			<div className='flex flex-col items-start justify-start gap-2'>
				<label className='font-semibold'>Коротко о себе</label>
				<textarea
					value={form.shortBio ?? ''}
					onChange={(e) => handleChange('shortBio', e.target.value)}
					className='w-full border p-2'
					rows={3}
				/>
			</div>

			<div>
				<label className='font-semibold'>Подробно о себе</label>
				<ReactQuill
					theme='snow'
					value={form.fullBio ?? ''}
					onChange={(value) => handleChange('fullBio', value)}
					className='mt-2'
				/>
			</div>

			<button
				disabled={isUpdating}
				onClick={handleSubmit}
				className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
			>
				{isUpdating ? 'Сохраняем...' : 'Сохранить'}
			</button>
		</div>
	);
}
