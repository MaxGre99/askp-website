'use client';

import { useTranslation } from 'react-i18next';

import { ListFilter, useListFilter } from '@/features/list-filter';
import { Pagination } from '@/shared/ui/Pagination';

import { useEventsList } from '../model/use-events-list';

import { EventsList } from './EventsList';

export const EventsListWidget = () => {
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

	const { data, isLoading } = useEventsList(page, query, pageSize);

	const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<h1 className='font-bad-script text-white text-3xl'>
					{t('events.pageTitle')}
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
					<EventsList items={data.events} />

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
