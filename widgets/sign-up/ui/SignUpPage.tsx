'use client';

import { useState } from 'react';

import { SignUpForm } from './SignUpForm';
import { steps } from './signUpInfo';

export const SignUpPage = () => {
	// Временно — только для загрузки файлов
	const [uploading, setUploading] = useState(false);
	const [urls, setUrls] = useState<string[]>([]);

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		setUploading(true);
		const results = await Promise.all(
			files.map(async (file) => {
				const formData = new FormData();
				formData.append('file', file);
				const res = await fetch('/api/documents', {
					method: 'POST',
					body: formData,
				});
				const data = await res.json();
				return data.url;
			}),
		);
		setUrls(results);
		setUploading(false);
	};

	return (
		<div className='flex flex-1 w-full flex-col items-center justify-center gap-6'>
			<div className='p-4 bg-yellow-50 border border-yellow-200 rounded-xl'>
				<input type='file' accept='.pdf' multiple onChange={handleUpload} />
				{uploading && <p>Загрузка...</p>}
				{urls.map((url) => (
					<p key={url}>
						<a href={url}>{url}</a>
					</p>
				))}
			</div>
			<section className='bg-white rounded-2xl p-6 w-full max-w-5xl shadow-sm'>
				<h3 className='text-xl text-center font-bold mb-6'>
					Чек-лист: Вступление в АСКП
				</h3>

				<ol className='flex flex-col gap-4'>
					{steps.map((step, i) => (
						<li key={i} className='flex flex-col gap-3'>
							<div className='flex gap-4 items-center'>
								<span className='shrink-0 w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center leading-none'>
									{i + 1}
								</span>
								<p className='text-gray-700'>{step.text}</p>
							</div>

							{step.sub && (
								<ul className='flex flex-col gap-2 pl-11'>
									{step.sub.map((item, j) => (
										<li key={j} className='flex gap-3 items-start'>
											<span className='shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-2' />
											<p className='text-gray-600 text-sm leading-relaxed'>
												{item}
											</p>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ol>
			</section>

			<SignUpForm />
		</div>
	);
};
