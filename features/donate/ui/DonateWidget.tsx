'use client';

import { useState } from 'react';

import { useTranslation } from 'react-i18next';

const AMOUNTS = [100, 300, 500, 1000];

export const DonateWidget = () => {
	const { t } = useTranslation();

	const [amount, setAmount] = useState(300);
	const [loading, setLoading] = useState(false);

	const handleDonate = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/donations/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount }),
			});
			const data = await res.json();
			if (data.url) window.location.href = data.url;
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col gap-4 p-6 bg-white rounded-2xl max-w-sm border border-gray-300'>
			<h3 className='font-bold text-lg'>{t('labels.helpTheProject')}</h3>
			<div className='flex gap-2 flex-wrap'>
				{AMOUNTS.map((a) => (
					<button
						key={a}
						type='button'
						onClick={() => setAmount(a)}
						className={`px-4 py-2 rounded-xl border transition ${
							amount === a
								? 'bg-blue-500 text-white border-blue-500'
								: 'bg-white border-gray-200 hover:border-blue-300'
						}`}
					>
						{a} ₽
					</button>
				))}
			</div>
			<button
				onClick={handleDonate}
				disabled={loading}
				className='bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 active:bg-blue-400 disabled:opacity-50 transition'
			>
				{loading ? t('buttons.redirect') : `${t('buttons.donate')} ${amount} ₽`}
			</button>
			<p className='text-xs text-gray-400 text-center'>
				Принимаем Мир, Visa, Mastercard, СБП, ЮMoney
			</p>
		</div>
	);
};
