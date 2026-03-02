'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import Select from 'react-select';

import {
	Profile,
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '@/entities/profiles';

// Quill динамически, чтобы не было SSR ошибок
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
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
	const { data: profile, isLoading } = useGetProfileQuery();
	const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

	const [form, setForm] = useState<Partial<Profile>>({});

	useEffect(() => {
		const handleInitForm = async () => {
			if (profile) setForm(profile);
		};

		handleInitForm();
	}, [profile]);

	if (isLoading) return <div>Загрузка профиля...</div>;

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

	return (
		<div className='max-w-2xl mx-auto p-4 space-y-4'>
			<h1 className='text-2xl font-bold'>Профиль</h1>

			<div className='grid grid-cols-2 gap-4'>
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
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<Select
					placeholder='Пол'
					options={genderOptions}
					value={genderOptions.find((opt) => opt.value === form.gender) || null}
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

			<div className='space-y-2'>
				<label className='font-semibold'>Коротко о себе</label>
				<textarea
					value={form.shortBio ?? ''}
					onChange={(e) => handleChange('shortBio', e.target.value)}
					className='w-full border p-2'
					rows={3}
				/>
			</div>

			<div className='space-y-2'>
				<label className='font-semibold'>Подробно о себе</label>
				<ReactQuill
					theme='snow'
					value={form.fullBio ?? ''}
					onChange={(value) => handleChange('fullBio', value)}
				/>
			</div>

			<button
				disabled={isUpdating}
				onClick={handleSubmit}
				className='bg-blue-500 text-white px-4 py-2 rounded'
			>
				{isUpdating ? 'Сохраняем...' : 'Сохранить'}
			</button>
		</div>
	);
}
