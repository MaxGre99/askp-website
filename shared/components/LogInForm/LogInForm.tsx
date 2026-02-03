import { useLogInMutation } from '@/shared/api/authApi';
import { ApiError } from '@/shared/api/types/auth';
import React, { useState } from 'react';

const LogInForm = ({
	setShowMenu,
}: {
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState<string>('');

	const [logIn, { isLoading }] = useLogInMutation();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await logIn({ email, password, rememberMe }).unwrap();
		} catch (e) {
			setError((e as ApiError).data.error);
		}
	};

	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-3'>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className='border rounded px-2 py-1'
				required
			/>

			<div className='relative'>
				<input
					type={showPassword ? 'text' : 'password'}
					placeholder='Пароль'
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
				Запомнить меня
			</label>

			{error && <p className='text-sm text-red-500'>{error}</p>}

			<button
				type='submit'
				disabled={isLoading}
				className='bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 disabled:opacity-50'
			>
				{isLoading ? 'Входим…' : 'Войти'}
			</button>
		</form>
	);
};

export default LogInForm;
