'use client';

import { useTranslation } from 'react-i18next';

import { ListFilter, useListFilter } from '@/features/list-filter';
import { NewsList, useMyNewsList } from '@/features/news-list';
import { Pagination } from '@/shared/ui/Pagination';

const Page = () => {
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

	const { data, isLoading } = useMyNewsList(page, query, pageSize);

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
					<NewsList items={data.news} accentColor='blue' />

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

export default Page;
