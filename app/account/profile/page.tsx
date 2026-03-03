'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { Form, Formik, useField } from 'formik';
import Select, { MultiValue, SingleValue } from 'react-select';
import * as Yup from 'yup';

import {
	Profile,
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '@/entities/profiles';

// Quill динамически
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

import { useTranslation } from 'react-i18next';

import {
	Avatar,
	useGetAvatarQuery,
	useUploadAvatarMutation,
} from '@/entities/avatars';
import { AvatarEditorModal } from '@/features/avatar-editor-modal';
import { BaseButton } from '@/shared/ui/BaseButton';
import { FormField } from '@/shared/ui/FormField';

import { PROFILE_MAIN_LABELS, PROFILE_SIDE_LABELS } from './consts';

import 'react-quill-new/dist/quill.snow.css';

// ────────────────────────────────────────────────
// Схема валидации (можно расширить)
// ────────────────────────────────────────────────
const profileSchema = Yup.object({
	firstName: Yup.string().required('Имя обязательно'),
	lastName: Yup.string().required('Фамилия обязательна'),
	middleName: Yup.string().nullable(),
	displayName: Yup.string().nullable(),
	gender: Yup.string().oneOf(['MALE', 'FEMALE', 'OTHER']).nullable(),
	maritalStatus: Yup.string()
		.oneOf(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'])
		.nullable(),
	languages: Yup.array().of(Yup.string()).nullable(),
	birthDate: Yup.date().nullable(),
	shortBio: Yup.string().max(500).nullable(),
	fullBio: Yup.string().nullable(),
});

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

const allOptions = {
	gender: genderOptions,
	maritalStatus: maritalOptions,
	languages: languageOptions,
};

// Кастомный Select под Formik (чтобы не ломать react-select)
const ProfileFormikSelect = ({
	name,
	options,
	isMulti = false,
	placeholder,
	label,
}: {
	name: string;
	options: { value: string; label: string }[];
	isMulti?: boolean;
	placeholder?: string;
	label: string;
}) => {
	const [field, meta, helpers] = useField(name);

	return (
		<div className='flex flex-col gap-1'>
			<label className='font-bold'>{label}</label>
			<Select
				options={options}
				value={
					isMulti
						? options.filter((opt) => field.value?.includes(opt.value))
						: options.find((opt) => opt.value === field.value) || null
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onChange={(selected: SingleValue<any> | MultiValue<any>) => {
					if (isMulti) {
						// ← здесь точно массив
						helpers.setValue(
							Array.isArray(selected) ? selected.map((o) => o.value) : [],
						);
					} else {
						// ← здесь одиночный объект
						helpers.setValue(
							selected ? (selected as { value: string }).value : null,
						);
					}
				}}
				placeholder={placeholder}
				isMulti={isMulti}
			/>
			{meta.touched && meta.error && (
				<p className='text-red-500 text-sm'>{meta.error}</p>
			)}
		</div>
	);
};

const QuillField = ({ name, label }: { name: string; label: string }) => {
	const [field, meta, helpers] = useField(name);

	return (
		<div>
			<label className='font-bold'>{label}</label>
			<ReactQuill
				theme='snow'
				value={field.value || ''}
				onChange={(value) => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				className='mt-2'
				readOnly={false}
				modules={{
					toolbar: [
						[{ header: [1, 2, 3, false] }],
						['bold', 'italic', 'underline', 'strike'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['link'],
						['clean'],
					],
				}}
			/>
			{meta.touched && meta.error && (
				<p className='text-red-500 text-sm'>{meta.error}</p>
			)}
		</div>
	);
};

export default function ProfilePage() {
	const { t } = useTranslation();
	const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
	const { data: avatar } = useGetAvatarQuery(profile?.userId as string, {
		skip: !profile?.userId,
	});

	const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
	const [uploadAvatar, { isLoading: isUploadingAvatar }] =
		useUploadAvatarMutation();

	const [isEditing, setIsEditing] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

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
			const formData = new FormData();
			const croppedFile = new File([croppedBlob], 'avatar.png', {
				type: 'image/png',
			});
			formData.append('file', croppedFile);
			await uploadAvatar(formData).unwrap();
			setIsEditorOpen(false);
			setSelectedFile(null);
		} catch (e) {
			console.error('Upload failed', e);
			alert('Ошибка при загрузке аватара');
		}
	};

	const formatDateForInput = (date: string | null | undefined) => {
		if (!date) return '';

		// Если дата уже в правильном формате, возвращаем как есть
		if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
			return date;
		}

		// Пробуем распарсить дату
		try {
			const d = new Date(date);
			if (isNaN(d.getTime())) return '';

			const year = d.getFullYear();
			const month = String(d.getMonth() + 1).padStart(2, '0');
			const day = String(d.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		} catch {
			return '';
		}
	};

	if (loadingProfile) return <div>Загрузка профиля...</div>;

	// Начальные значения для Formik
	const initialValues: Partial<Profile> = {
		firstName: profile?.firstName ?? '',
		lastName: profile?.lastName ?? '',
		middleName: profile?.middleName ?? '',
		displayName: profile?.displayName ?? '',
		gender: profile?.gender ?? null,
		maritalStatus: profile?.maritalStatus ?? null,
		languages: profile?.languages ?? [],
		birthDate: formatDateForInput(profile?.birthDate), // ← вот здесь преобразуем
		shortBio: profile?.shortBio ?? '',
		fullBio: profile?.fullBio ?? '',
	};

	return (
		<div className='w-full flex flex-col items-stretch justify-start gap-6'>
			<AvatarEditorModal
				isOpen={isEditorOpen}
				onClose={() => {
					setIsEditorOpen(false);
					setSelectedFile(null);
					if (fileInputRef.current) fileInputRef.current.value = '';
				}}
				image={selectedFile}
				onSave={handleSaveCroppedImage}
			/>

			<Formik
				initialValues={initialValues}
				validationSchema={profileSchema}
				enableReinitialize
				onSubmit={async (values) => {
					try {
						// Преобразуем дату обратно в ISO строку перед отправкой
						const submitValues = {
							...values,
							birthDate: values.birthDate
								? new Date(values.birthDate).toISOString()
								: null,
						};
						await updateProfile(submitValues).unwrap();
						alert('Профиль обновлен!');
						setIsEditing(false);
					} catch (err) {
						console.error(err);
						alert('Ошибка при обновлении');
					}
				}}
			>
				{({ isSubmitting, dirty, resetForm }) => (
					<Form className='flex flex-col items-stretch justify-start gap-6'>
						<div className='flex flex-row gap-6 items-center justify-between'>
							{/* Аватар — без изменений */}
							<div className='flex flex-col justify-start gap-6'>
								<div className='rounded-md bg-gray-100 min-w-[256px] min-h-[256px] w-[256px] h-[256px] flex items-center justify-center border-gray-400 border overflow-hidden'>
									<Avatar src={avatar?.url} />
								</div>
								<BaseButton
									disabled={isUploadingAvatar}
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

							{/* ПРАВАЯ КОЛОНКА — ВОТ ЗДЕСЬ ДВА РЕЖИМА */}
							<div className='flex flex-1 flex-col items-stretch justify-between w-full h-full gap-2'>
								{PROFILE_MAIN_LABELS.map((label) =>
									isEditing ? (
										<FormField<Profile>
											name={label as keyof typeof profile}
											label={t(`labels.${label}`)}
											placeholder={t(`labels.${label}`)}
											required
											key={label}
											type={label === 'birthDate' ? 'date' : 'text'}
										/>
									) : (
										<div key={label}>
											<strong>{t(`labels.${label}`)}:</strong>{' '}
											{label === 'birthDate'
												? new Date(
														(profile?.[
															label as keyof typeof profile
														] as string) || '',
													).toLocaleDateString('ru-RU')
												: profile?.[label as keyof typeof profile] || '—'}
										</div>
									),
								)}

								{PROFILE_SIDE_LABELS.map((label) =>
									isEditing ? (
										<ProfileFormikSelect
											name={label as keyof typeof profile}
											options={
												allOptions[label as keyof typeof allOptions] || []
											}
											label={t(`labels.${label}`)}
											placeholder={t(`labels.${label}`)}
											key={label}
											isMulti={label === 'languages'}
										/>
									) : (
										<div key={label}>
											<strong>{t(`labels.${label}`)}:</strong>{' '}
											{label === 'languages'
												? (profile?.[label as keyof typeof profile] as string[])
														?.map((lang) => t(`labels.${lang}`))
														.join(', ')
												: t(
														`labels.${profile?.[label as keyof typeof profile]}`,
													) || '—'}
										</div>
									),
								)}
							</div>
						</div>

						{/* Коротко о себе */}
						<div className='flex flex-col items-start justify-start gap-2'>
							<label className='font-bold'>Коротко о себе:</label>
							{isEditing ? (
								<FormField<Profile>
									name='shortBio'
									as='textarea'
									placeholder='Коротко о себе'
									className='w-full min-h-[90px]'
								/>
							) : (
								<div className='w-full'>{profile?.shortBio || '—'}</div>
							)}
						</div>

						{/* Подробно о себе */}
						{isEditing ? (
							<QuillField name='fullBio' label='Подробно о себе' />
						) : (
							<div>
								<label className='font-bold'>Подробно о себе:</label>
								<ReactQuill
									theme='snow'
									value={profile?.fullBio || ''}
									readOnly={true}
									modules={{ toolbar: false }}
									className='mt-2'
								/>
							</div>
						)}

						{/* Кнопки управления */}
						<div className='flex justify-end gap-3'>
							{isEditing ? (
								<>
									<BaseButton
										type='button'
										// variant='outline'
										onClick={() => {
											resetForm();
											setIsEditing(false);
										}}
										disabled={isSubmitting}
									>
										Отмена
									</BaseButton>
									<BaseButton type='submit' disabled={isSubmitting || !dirty}>
										{isSubmitting ? 'Сохраняем...' : 'Сохранить'}
									</BaseButton>
								</>
							) : (
								<BaseButton type='button' onClick={() => setIsEditing(true)}>
									Редактировать профиль
								</BaseButton>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
