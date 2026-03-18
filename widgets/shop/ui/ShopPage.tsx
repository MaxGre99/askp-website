'use client';

import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

import { ProductCard, useGetAllProductsQuery } from '@/entities/products';
import { ListFilter, useListFilter } from '@/features/list-filter';
import { Button } from '@/shared/ui/Button';
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
	const { data, isLoading } = useGetAllProductsQuery({ page, query, pageSize });
	const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<h1 className='font-oswald text-white font-light'>Магазин</h1>
				<div className='flex gap-3 items-center'>
					<ListFilter
						value={draftQuery}
						onChange={setDraftQuery}
						onSubmit={applyFilter}
						placeholder='Поиск по названию...'
						buttonText='Найти'
						pageSize={pageSize}
						onPageSizeChange={changePageSize}
					/>
					<Button href={'/shop/add'} className='shrink-0'>
						<FaPlus /> {t('buttons.addProduct')}
					</Button>
				</div>
			</div>

			{!isLoading && data && data.products.length > 0 ? (
				<>
					<div className='flex flex-wrap gap-6'>
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
			) : (
				<p className='font-oswald flex flex-1 w-full items-center justify-center text-white text-3xl'>
					{t('notifications.empty')}
				</p>
			)}
		</div>
	);
};
