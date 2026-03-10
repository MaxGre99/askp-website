'use client';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { useDeleteNewsMutation } from '@/entities/news';
import { ListFilter, useListFilter } from '@/features/list-filter';
import { NewsList, useMyNewsList } from '@/features/news-list';
import { BaseButton } from '@/shared/ui/BaseButton';
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

	const [deleteNews] = useDeleteNewsMutation();

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<Link href={'/account/news/add'}>
					<BaseButton>
						<FaPlus /> {t('buttons.addNews')}
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
					<NewsList
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

export default Page;
