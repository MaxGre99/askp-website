'use client';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { useDeleteNewsMutation } from '@/entities/news';
import { ListFilter, useListFilter } from '@/features/list-filter';
import { useMyNewsList, WideCardsList } from '@/features/wide-cards-list';
import { Button } from '@/shared/ui/Button';
import { Pagination } from '@/shared/ui/Pagination';

export const MyNewsPage = () => {
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

	const [deleteNews] = useDeleteNewsMutation();

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<Button href={'/account/news/add'}>
					<FaPlus /> {t('buttons.addNews')}
				</Button>

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
						items={data.news}
						accentColor='blue'
						showAdminActions
						onDelete={deleteNews}
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
