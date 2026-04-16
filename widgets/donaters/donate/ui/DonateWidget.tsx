// 'use client';

// import { useState } from 'react';

import Image from 'next/image';

import { useTranslation } from 'react-i18next';

// import { Button } from '@/shared/ui/Button';
import QR from '../assets/askp_qr.png';

// const AMOUNTS = [100, 300, 500, 1000];

export const DonateWidget = () => {
	const { t } = useTranslation();

	// const [amount, setAmount] = useState(300);
	// const [loading, setLoading] = useState(false);

	// const handleDonate = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const res = await fetch('/api/donations/checkout', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({ amount }),
	// 		});
	// 		const data = await res.json();
	// 		if (data.url) window.location.href = data.url;
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	return (
		<div className='flex flex-col gap-4 p-6 bg-white rounded-2xl max-w-sm border border-gray-300 items-center'>
			<h3 className='font-bold text-lg'>{t('labels.helpTheProject')}</h3>
			<p className='text-center'>
				Для добавления в список меценатов, напишите нам в{' '}
				<a
					href={process.env.NEXT_PUBLIC_VK_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-500 hover:underline hover:text-blue-700 active:text-blue-900'
				>
					группу ВКонтакте
				</a>
				, приложив чек
			</p>
			<Image src={QR} alt='QR-код для доната' className='w-full' />
			{/* <div className='flex gap-2 flex-wrap justify-center'>
				{AMOUNTS.map((a) => (
					<Button
						key={a}
						type='button'
						onClick={() => setAmount(a)}
						variant='white'
						isActive={amount === a}
						disabled={loading}
					>
						{a} ₽
					</Button>
				))}
			</div>
			<Button onClick={handleDonate} disabled={loading}>
				{loading ? t('buttons.redirect') : `${t('buttons.donate')} ${amount} ₽`}
			</Button>
			<p className='text-xs text-gray-400 text-center'>
				Принимаем Мир, Visa, Mastercard, СБП, ЮMoney
			</p> */}
		</div>
	);
};
