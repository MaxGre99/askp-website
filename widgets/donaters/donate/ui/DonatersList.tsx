'use client';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { useGetAllDonatersQuery } from '@/entities/donaters';
import { useGetMeQuery } from '@/entities/users';
import { handleApiError } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';

import { DonatersCard } from './DonatersCard';
import { DonateWidget } from './DonateWidget';

export const DonatersList = () => {
	const { t } = useTranslation();
	const { data, isLoading, isError, error } = useGetAllDonatersQuery();
	const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
	const isAdmin = !isLoadingUser && user && user?.role !== 'USER';

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	if (isLoading) return <Loader />;

	return (
		<>
			{isAdmin && (
				<div className='flex self-end'>
					<Button href={'/donate/add'} variant='white'>
						<FaPlus /> {t('buttons.addDonater')}
					</Button>
				</div>
			)}
			<div className='flex flex-col flex-1 gap-6 items-center justify-center w-full'>
				{data?.donaters.length ? (
					data.donaters.map((donater) => (
						<DonatersCard
							key={donater.id}
							donater={donater}
							showAdminActions={isAdmin}
						/>
					))
				) : (
					<div className='flex flex-col items-center gap-2 text-white'>
						<h1>{t('labels.noDonatersYet')}</h1>
						<h2>{t('labels.youCanBeFirst')}</h2>
					</div>
				)}

				<DonateWidget />
			</div>
		</>
	);
};
