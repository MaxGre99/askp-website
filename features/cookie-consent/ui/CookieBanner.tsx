'use client';

import Link from 'next/link';

import { useCookieConsent } from '../model/useCookieConsent';

export const CookieBanner = () => {
	const { show, accept } = useCookieConsent();

	if (!show) return null;

	return (
		<div className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg'>
			<div className='max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4'>
				<p className='text-sm text-gray-600 text-center sm:text-left'>
					Мы используем файлы cookie для авторизации и корректной работы сайта.
					Продолжая использование сайта, вы соглашаетесь с нашей{' '}
					<Link
						href='/cookies'
						className='underline text-blue-500 hover:text-blue-600 active:text-blue-400 transition-colors'
					>
						политикой cookie
					</Link>{' '}
					и{' '}
					<Link
						href='/privacy'
						className='underline text-blue-500 hover:text-blue-600 active:text-blue-400 transition-colors'
					>
						политикой конфиденциальности
					</Link>
					.
				</p>
				<button
					onClick={accept}
					className='shrink-0 bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 active:bg-blue-400 transition-colors text-sm'
				>
					Принять
				</button>
			</div>
		</div>
	);
};
