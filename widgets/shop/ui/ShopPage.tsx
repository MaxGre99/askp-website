'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { useGetAllProductsQuery } from '@/entities/products';
import { useGetMeQuery } from '@/entities/users';
import { ListFilter, useListFilter } from '@/features/list-filter';
import { handleApiError } from '@/shared/lib/helpers';
import { Loader } from '@/shared/ui/Loader';
import { Pagination } from '@/shared/ui/Pagination';

import { ProductCard } from './ProductCard';

export const ShopPage = () => {
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

	const { data: user, isLoading: isLoadingUser } = useGetMeQuery();

	const isAdmin = !isLoadingUser && user && user.role !== 'USER';

	const { data, isLoading, isError, error } = useGetAllProductsQuery({
		page,
		query,
		pageSize,
		showAll: isAdmin,
	});

	const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	if (isLoading) return <Loader />;

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3 w-full flex-wrap md:flex-nowrap'>
				<h1 className='font-oswald text-white font-light'>Магазин</h1>
				<ListFilter
					value={draftQuery}
					onChange={setDraftQuery}
					onSubmit={applyFilter}
					placeholder={t('placeholders.productNameFilter')}
					buttonText={t('buttons.find')}
					pageSize={pageSize}
					onPageSizeChange={changePageSize}
				/>
			</div>

			{data && data.products.length > 0 ? (
				<>
					<div className='flex flex-1 w-full flex-wrap gap-6 justify-center'>
						{isAdmin && (
							<Link href='/shop/add'>
								<article className='rounded-2xl flex flex-col min-w-[320px] w-[320px] min-h-[420px] h-[420px] border-6 border-dashed border-white/60 hover:border-white transition-all hover:scale-[1.01] cursor-pointer group'>
									<div className='flex flex-col flex-1 items-center justify-center gap-3 p-6 text-white/60 group-hover:text-white transition-colors'>
										<FaPlus size={32} />
										<span className='font-oswald text-2xl tracking-wide'>
											{t('buttons.addProduct')}
										</span>
									</div>
								</article>
							</Link>
						)}
						{data.products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
					<Pagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={changePage}
					/>
				</>
			) : isAdmin ? (
				<Link href='/shop/add'>
					<article className='rounded-2xl flex flex-col min-w-[320px] w-[320px] min-h-[420px] h-[420px] border-6 border-dashed border-white/60 hover:border-white transition-all hover:scale-[1.01] cursor-pointer group'>
						<div className='flex flex-col flex-1 items-center justify-center gap-3 p-6 text-white/60 group-hover:text-white transition-colors'>
							<FaPlus size={32} />
							<span className='font-oswald text-2xl tracking-wide'>
								{t('buttons.addProduct')}
							</span>
						</div>
					</article>
				</Link>
			) : (
				<p className='font-oswald flex flex-1 w-full items-center justify-center text-white text-3xl'>
					{t('notifications.empty')}
				</p>
			)}
		</div>
	);
};
