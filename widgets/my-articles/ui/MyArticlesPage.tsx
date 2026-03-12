'use client';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { useDeleteArticleMutation } from '@/entities/articles';
import { ListFilter, useListFilter } from '@/features/list-filter';
import { useMyArticlesList, WideCardsList } from '@/features/wide-cards-list';
import { BaseButton } from '@/shared/ui/BaseButton';
import { Pagination } from '@/shared/ui/Pagination';

export const MyArticlesPage = () => {
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

	const { data, isLoading } = useMyArticlesList(page, query, pageSize);

	const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

	const [deleteArticle] = useDeleteArticleMutation();

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<Link href={'/account/articles/add'}>
					<BaseButton>
						<FaPlus /> {t('buttons.addArticle')}
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
						items={data.articles}
						accentColor='blue'
						showAdminActions
						onDelete={deleteArticle}
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
