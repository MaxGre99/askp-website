'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { ListFilter, useListFilter } from '@/features/list-filter';
import { PreviewCardsList } from '@/features/preview-cards-list';
import { handleApiError } from '@/shared/lib/handleApiError';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Pagination } from '@/shared/ui/Pagination';

import { CONTENT_LIST_CONFIG, ContentListType } from '../model/config';

interface Props {
	type: ContentListType;
	mode: 'all' | 'my';
	withAuthor?: boolean;
	showAll?: boolean;
}

export const ContentList = ({ type, mode, withAuthor, showAll }: Props) => {
	const pathname = usePathname();
	const isAccountPage = pathname.includes('/account/');
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
	const { data, isLoading, isError, error } = queryHook({
		page,
		query,
		pageSize,
		withAuthor,
		showAll,
	});

	const [deleteMutation] = config.deleteMutation();
	const [publishMutation] = config.publishMutation();
	const [unpublishMutation] = config.unpublishMutation();

	const handleDelete = async (slug: string) => {
		try {
			await deleteMutation(slug).unwrap();
		} catch (err) {
			handleApiError(err);
		}
	};

	const handlePublish = async (slug: string) => {
		try {
			await publishMutation(slug).unwrap();
		} catch (err) {
			handleApiError(err);
		}
	};

	const handleUnpublish = async (slug: string) => {
		try {
			await unpublishMutation(slug).unwrap();
		} catch (err) {
			handleApiError(err);
		}
	};

	const items = config.getItems(data);
	const total = config.getTotal(data);
	const totalPages = Math.ceil(total / pageSize) || 1;

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	if (isLoading) return <Loader />;

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3 w-full flex-wrap md:flex-nowrap'>
				{mode === 'my' || isAccountPage ? (
					<Button href={config.addHref} className='w-full md:w-fit md:shrink-0'>
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

			{items.length > 0 ? (
				<>
					<PreviewCardsList
						items={items}
						type={type}
						{...((mode === 'my' || isAccountPage) && {
							onDelete: handleDelete,
							onPublish: handlePublish,
							onUnpublish: handleUnpublish,
						})}
					/>
					<Pagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={changePage}
					/>
				</>
			) : (
				<p
					className={clsx(
						'font-oswald flex flex-1 w-full items-center justify-center text-3xl',
						mode === 'my' || isAccountPage ? 'text-gray-700' : 'text-white',
					)}
				>
					{t('notifications.empty')}
				</p>
			)}
		</div>
	);
};
