'use client';

import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { TransparentButton } from '@/shared/ui/TransparentButton';

import { FeedbackForm } from './FeedbackForm';

export const HomeFeedback = () => {
	const { t } = useTranslation();
	const [type, setType] = useState<'cooperation' | 'consultation'>(
		'cooperation',
	);

	return (
		<section className='text-white flex flex-col gap-5 items-center w-full'>
			<h1 className='font-oswald'>{t('feedbackForm.title')}</h1>
			<div className='relative flex bg-white/20 rounded-full w-fit'>
				{/* Анимированный индикатор */}
				<div
					className={`absolute top-0 bottom-0 w-1/2 rounded-full bg-blue-500/70 transition-transform duration-300 ease-out
							${type === 'cooperation' ? 'translate-x-0' : 'translate-x-full'}`}
				/>

				<TransparentButton
					type='button'
					onClick={() => setType('cooperation')}
					className='relative z-10 px-6 py-3 text-white font-medium w-1/2! h-fit! font-inter text-lg hover:bg-transparent!'
				>
					{t('feedbackForm.buttons.cooperation')}
				</TransparentButton>

				<TransparentButton
					type='button'
					onClick={() => setType('consultation')}
					className='relative z-10 px-6 py-3 text-white font-medium w-1/2 h-fit! font-inter text-lg hover:bg-transparent!'
				>
					{t('feedbackForm.buttons.consultation')}
				</TransparentButton>
			</div>
			<FeedbackForm type={type} />
		</section>
	);
};
