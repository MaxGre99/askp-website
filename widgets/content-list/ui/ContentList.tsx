'use client';

import { usePathname } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

// import { useGetUserQuery } from '@/entities/users';
import { ListFilter, useListFilter } from '@/features/list-filter';
import { WideCardsList } from '@/features/wide-cards-list';
import { Button } from '@/shared/ui/Button';
import { Pagination } from '@/shared/ui/Pagination';

import { CONTENT_LIST_CONFIG, ContentListType } from '../model/config';

interface Props {
	type: ContentListType;
	mode: 'all' | 'my';
	withAuthor?: boolean;
}

export const ContentList = ({ type, mode, withAuthor }: Props) => {
	// const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
	const pathname = usePathname();
	const isAccountPage = pathname.includes('/account/');
	// const isAccountPage = !isLoadingUser && user && user.role !== 'USER';
	const { t } = useTranslation();
	const config = CONTENT_LIST_CONFIG[type];

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

	const queryHook = mode === 'my' ? config.getMyQuery : config.getAllQuery;
	const { data, isLoading } = queryHook({ page, query, pageSize, withAuthor });
	const [deleteMutation] = config.deletemutation();

	console.log(data);

	const items = config.getItems(data);
	const total = config.getTotal(data);
	const totalPages = Math.ceil(total / pageSize) || 1;

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				{mode === 'my' || isAccountPage ? (
					<Button href={config.addHref}>
						<FaPlus /> {t(config.addButtonKey)}
					</Button>
				) : (
					<h1 className='font-oswald text-white font-light'>
						{t(config.titleKey)}
					</h1>
				)}

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

			{!isLoading && items.length > 0 ? (
				<>
					<WideCardsList
						items={items}
						{...((mode === 'my' || isAccountPage) && {
							onDelete: deleteMutation,
						})}
					/>
					<Pagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={changePage}
					/>
				</>
			) : (
				!isLoading && (
					<p className='font-oswald flex flex-1 w-full items-center justify-center text-white text-3xl'>
						{t('notifications.empty')}
					</p>
				)
			)}
		</div>
	);
};
