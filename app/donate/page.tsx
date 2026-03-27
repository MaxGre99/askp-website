'use client';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { DonatersCard, useGetAllDonatersQuery } from '@/entities/donaters';
import { useGetMeQuery } from '@/entities/users';
import { DonateWidget } from '@/features/donate';
import { handleApiError } from '@/shared/lib/handleApiError';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';

const Page = () => {
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
						<h1>Пока никто не поддержал проект...</h1>
						<h2>Но вы можете стать первым!</h2>
					</div>
				)}

				<DonateWidget />
			</div>
		</>
	);
};

export default Page;
