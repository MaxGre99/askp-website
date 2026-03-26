'use client';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

// import { MdImageNotSupported } from 'react-icons/md';
import { ProductCard, useGetAllProductsQuery } from '@/entities/products';
import { useGetMeQuery } from '@/entities/users';
import { ListFilter, useListFilter } from '@/features/list-filter';
// import { Button } from '@/shared/ui/Button';
import { Pagination } from '@/shared/ui/Pagination';

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

	const { data, isLoading } = useGetAllProductsQuery({
		page,
		query,
		pageSize,
		showAll: isAdmin,
	});
	const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<h1 className='font-oswald text-white font-light'>Магазин</h1>
				{/* <div className='flex gap-3 items-center'> */}
				<ListFilter
					value={draftQuery}
					onChange={setDraftQuery}
					onSubmit={applyFilter}
					placeholder={t('placeholders.productNameFilter')}
					buttonText={t('buttons.find')}
					pageSize={pageSize}
					onPageSizeChange={changePageSize}
				/>
				{/* <Button href={'/shop/add'} variant='white' className='shrink-0'>
						<FaPlus /> {t('buttons.addProduct')}
					</Button>
				</div> */}
			</div>

			{!isLoading && data && data.products.length > 0 ? (
				<>
					<div className='flex flex-1 w-full flex-wrap gap-6'>
						{isAdmin && (
							<Link href='/shop/add'>
								<article className='rounded-2xl flex flex-col min-w-[320px] w-[320px] min-h-[320px] h-[368px] border-6 border-dashed border-white/60 hover:border-white transition-all hover:scale-[1.01] cursor-pointer group'>
									<div className='flex flex-col flex-1 items-center justify-center gap-3 p-6 text-white/60 group-hover:text-white transition-colors'>
										<FaPlus size={32} />
										<span className='font-oswald text-2xl tracking-wide'>
											Добавить товар
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
					<article className='rounded-2xl flex flex-col min-w-[320px] w-[320px] min-h-[320px] h-[368px] border-6 border-dashed border-white/60 hover:border-white transition-all hover:scale-[1.01] cursor-pointer group'>
						<div className='flex flex-col flex-1 items-center justify-center gap-3 p-6 text-white/60 group-hover:text-white transition-colors'>
							<FaPlus size={32} />
							<span className='font-oswald text-2xl tracking-wide'>
								Добавить товар
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
