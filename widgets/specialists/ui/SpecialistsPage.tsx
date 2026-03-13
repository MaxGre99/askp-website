'use client';

import { useTranslation } from 'react-i18next';

import { ListFilter, useListFilter } from '@/features/list-filter';
import { Pagination } from '@/shared/ui/Pagination';
import { ProfileCard } from '@/widgets/home/ui/ProfileCard';

import { useAllProfilesList } from '../model/useAllProfilesList';

export const SpecialistsPage = () => {
	const { t } = useTranslation();

	const {
		page,
		query,
		pageSize,
		draftQuery,
		setDraftQuery,
		applyFilter,
		changePage,
		changePageSize,
	} = useListFilter();

	const { data, isLoading } = useAllProfilesList(page, query, pageSize);

	const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<h1 className='font-oswald text-white text-3xl'>
					{t('specialists.pageTitle')}
				</h1>

				<ListFilter
					value={draftQuery}
					onChange={setDraftQuery}
					onSubmit={applyFilter}
					placeholder={t('placeholders.titleFilter')}
					buttonText={t('buttons.find')}
					pageSize={pageSize}
					onPageSizeChange={changePageSize}
				/>
			</div>

			{!isLoading && data && (
				<>
					{data.profiles.length > 0 ? (
						<div className='flex flex-1 w-full flex-wrap gap-8 justify-center'>
							{data.profiles.map((profile) => (
								<ProfileCard key={profile.userId} profile={profile} />
							))}
						</div>
					) : (
						<p className='font-oswald text-white text-3xl'>
							{t('notifications.empty')}
						</p>
					)}

					<Pagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={changePage}
					/>
				</>
			)}
		</div>
	);
};
