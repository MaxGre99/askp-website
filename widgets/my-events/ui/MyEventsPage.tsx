'use client';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { useDeleteEventMutation } from '@/entities/events';
import { ListFilter, useListFilter } from '@/features/list-filter';
import { useMyEventsList, WideCardsList } from '@/features/wide-cards-list';
import { BaseButton } from '@/shared/ui/BaseButton';
import { Pagination } from '@/shared/ui/Pagination';

export const MyEventsPage = () => {
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

	const { data, isLoading } = useMyEventsList(page, query, pageSize);

	const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

	const [deleteEvent] = useDeleteEventMutation();

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<Link href={'/account/events/add'}>
					<BaseButton>
						<FaPlus /> {t('buttons.addEvent')}
					</BaseButton>
				</Link>

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
					<WideCardsList
						items={data.events}
						accentColor='blue'
						showAdminActions
						onDelete={deleteEvent}
					/>

					<Pagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={changePage}
						accentColor='blue'
					/>
				</>
			)}
		</div>
	);
};
