'use client';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { DonatersCard, useGetAllDonatersQuery } from '@/entities/donaters';
import { useGetMeQuery } from '@/entities/users';
import { DonateWidget } from '@/features/donate';
import { Button } from '@/shared/ui/Button';

const Page = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useGetAllDonatersQuery();
	const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
	const isAdmin = !isLoadingUser && user && user?.role !== 'USER';

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
				{isLoading ? (
					<div>Загрузка...</div>
				) : data?.donaters.length ? (
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
