'use client';

import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { FaArrowUp } from 'react-icons/fa';

import { Button } from '../Button';

export const ScrollToTop = () => {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 300);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	if (!visible) return null;

	return (
		<Button
			variant='white'
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			className='fixed p-2! bottom-1 right-1 z-50 xl:p-3! xl:bottom-6 xl:right-6 rounded-full'
			title={t('buttons.scrollToTop')}
		>
			<FaArrowUp />
		</Button>
	);
};
