'use client';

import { useState } from 'react';

const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const res = await fetch('/api/auth/signIn', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password, firstName, lastName }),
		});

		setLoading(false);

		if (!res.ok) {
			const data = await res.json();
			setError(data.message || 'Ошибка регистрации');
			return;
		}

		setSuccess(true);
		setEmail('');
		setPassword('');
	};

	if (success) {
		return (
			<p className='text-green-600 text-sm'>
				Регистрация успешна. Теперь можно войти.
			</p>
		);
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-3 w-64'>
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
					className='absolute right-2 top-1/2 -translate-y-1/2 text-sm'
				>
					{showPassword ? '🙈' : '👁️'}
				</button>
			</div>

			<input
				type='text'
				placeholder='Имя'
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				className='border rounded px-2 py-1'
				required
			/>

			<input
				type='text'
				placeholder='Фамилия'
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				className='border rounded px-2 py-1'
				required
			/>

			{error && <p className='text-red-500 text-sm'>{error}</p>}

			<button
				type='submit'
				disabled={loading}
				className='bg-cyan-500 text-white py-2 rounded disabled:opacity-50'
			>
				{loading ? 'Создаём…' : 'Зарегистрироваться'}
			</button>
		</form>
	);
};

export default RegisterForm;
