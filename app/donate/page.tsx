'use client';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { DonatersCard, useGetAllDonatersQuery } from '@/entities/donaters';
import { useGetUserQuery } from '@/entities/users';
import { DonateWidget } from '@/features/donate';
import { BaseButton } from '@/shared/ui/BaseButton';

const Page = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useGetAllDonatersQuery();
	const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
	const showAdminActions = !isLoadingUser && user && user?.role !== 'USER';

	return (
		<div className='flex flex-col flex-1 w-full bg-white rounded-2xl items-center justify-start p-6 gap-6'>
			{showAdminActions && (
				<div className='flex self-end'>
					<Link href={'/donate/add'}>
						<BaseButton>
							<FaPlus /> {t('buttons.addDonater')}
						</BaseButton>
					</Link>
				</div>
			)}
			<div className='flex flex-col flex-1 gap-6 items-center justify-center'>
				{isLoading ? (
					<div>Загрузка...</div>
				) : data?.donaters.length ? (
					data.donaters.map((donater) => (
						<DonatersCard
							key={donater.id}
							donater={donater}
							showAdminActions={showAdminActions}
						/>
					))
				) : (
					<div className='flex flex-col items-center gap-2'>
						<h1>Пока никто не поддержал проект...</h1>
						<h2>Но вы можете стать первым!</h2>
					</div>
				)}

				<DonateWidget />
			</div>
		</div>
	);
};

export default Page;
