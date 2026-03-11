'use client';

import { useTranslation } from 'react-i18next';

import { ListFilter, useListFilter } from '@/features/list-filter';
import { useAllNewsList, WideCardsList } from '@/features/wide-cards-list';
import { Pagination } from '@/shared/ui/Pagination';

export const NewsPage = () => {
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

	const { data, isLoading } = useAllNewsList(page, query, pageSize);

	const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<h1 className='font-oswald text-white text-3xl'>
					{t('news.pageTitle')}
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
					<WideCardsList items={data.news} />

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
