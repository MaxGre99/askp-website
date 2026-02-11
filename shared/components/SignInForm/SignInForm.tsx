import { useSignInMutation } from '@/shared/api/authApi';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SignInForm = ({
	setShowMenu,
}: {
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState<string>('');

	const [signIn, { isLoading }] = useSignInMutation();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signIn({ email, password, rememberMe }).unwrap();
		} catch (e) {
			setError(getApiErrorMessage(e));
		}
	};

	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-3'>
			<input
				type='email'
				placeholder={t('placeholders.email')}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className='border rounded px-2 py-1'
				required
			/>

			<div className='relative'>
				<input
					type={showPassword ? 'text' : 'password'}
					placeholder={t('placeholders.password')}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='border rounded px-2 py-1 w-full pr-10'
					required
				/>

				<button
					type='button'
					onClick={() => setShowPassword((v) => !v)}
					className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700'
				>
					{showPassword ? '🙈' : '👁️'}
				</button>
			</div>

			<label className='flex items-center gap-2 text-sm'>
				<input
					type='checkbox'
					checked={rememberMe}
					onChange={(e) => setRememberMe(e.target.checked)}
				/>
				{t('placeholders.rememberMe')}
			</label>

			{error && (
				<p className='text-sm text-red-500'>{t(`backendErrors.${error}`)}</p>
			)}

			<button
				type='submit'
				disabled={isLoading}
				className='bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 disabled:opacity-50'
			>
				{isLoading ? t('notifications.entering') : t('buttons.signIn')}
			</button>
		</form>
	);
};

export default SignInForm;
