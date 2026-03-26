import Link from 'next/link';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { BiShow, BiSolidHide } from 'react-icons/bi';
import { FaPencilRuler, FaRegTrashAlt } from 'react-icons/fa';
import { MdImageNotSupported } from 'react-icons/md';

import { useGetMeQuery } from '@/entities/users';
import { useConfirm } from '@/shared/hooks/useConfirmModal';
import { stripHtml } from '@/shared/lib/stripHtml';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';

import {
	Product,
	useDeleteProductMutation,
	usePublishProductMutation,
	useUnpublishProductMutation,
} from '../api/productsApi';

export const ProductCard = ({ product }: { product: Product }) => {
	const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
	const { t } = useTranslation();

	const { confirmProps, confirm } = useConfirm();

	const showAdminActions = !isLoadingUser && user && user.role !== 'USER';

	const [deleteProduct] = useDeleteProductMutation();
	const [publishProduct] = usePublishProductMutation();
	const [unpublishProduct] = useUnpublishProductMutation();

	return (
		<div className='flex flex-col gap-1'>
			<ConfirmModal {...confirmProps} />
			<Link href={`/shop/${product.slug}`}>
				<article className='bg-white rounded-2xl overflow-hidden transition hover:scale-[1.01] flex flex-col min-w-[320px] w-[320px] min-h-[320px] h-[420px]'>
					<div className='w-full min-h-[226px] flex items-center justify-center rounded-2xl border-b border-gray-200'>
						{product.images[0] ? (
							<img
								src={product.images[0]}
								alt={product.name}
								className='w-full h-full object-fill rounded-2xl'
							/>
						) : (
							<MdImageNotSupported size={64} className='text-gray-300' />
						)}
					</div>
					<div className='p-4 flex flex-col flex-1 gap-2'>
						<h3 className='font-semibold line-clamp-2 break-all'>
							{product.name}
						</h3>
						<p className='text-sm text-gray-600 line-clamp-3'>
							{stripHtml(product.description)}
						</p>
						<div className='flex flex-1 items-end justify-between mt-1'>
							<span className='font-bold text-blue-600'>{product.price} ₽</span>
							{showAdminActions && (
								<span
									className={clsx(
										'w-fit px-2.5 py-1 rounded-full text-xs font-medium',
										product.published && 'bg-green-100 text-green-700',
										!product.published && 'bg-gray-100 text-gray-600',
									)}
								>
									{t(
										`labels.${product.published ? 'published' : 'notPublished'}`,
									)}
								</span>
							)}
						</div>
					</div>
				</article>
			</Link>
			{showAdminActions && (
				<div className='flex gap-1 pl-1'>
					{!product.published ? (
						<button
							title={t('buttons.publishProduct')}
							type='button'
							onClick={() =>
								confirm(t('buttons.publishProduct'), () =>
									publishProduct(product.slug),
								)
							}
							className='bg-white/90 hover:bg-green-50 border border-gray-200 text-gray-600 hover:text-green-600 px-3 py-1 rounded-lg text-xs font-medium transition'
						>
							<BiShow size={16} />
						</button>
					) : (
						<button
							title={t('buttons.unpublishProduct')}
							type='button'
							onClick={() =>
								confirm(
									t('buttons.unpublishProduct'),
									() => unpublishProduct(product.slug),
									'delete',
								)
							}
							className='bg-white/90 hover:bg-gray-400 border border-gray-200 text-gray-600 hover:text-white px-3 py-1 rounded-lg text-xs font-medium transition'
						>
							<BiSolidHide size={16} />
						</button>
					)}
					<Link
						title={t('buttons.editProduct')}
						href={`shop/${product.slug}/edit`}
						className='bg-white/90 hover:bg-blue-50 border border-gray-200 text-gray-600 hover:text-blue-600 px-3 py-1 rounded-lg text-xs font-medium transition'
					>
						<FaPencilRuler size={16} />
					</Link>
					<button
						type='button'
						title={t('buttons.deleteProduct')}
						onClick={() =>
							confirm(
								t('buttons.deleteProduct'),
								() => deleteProduct(product.slug),
								'delete',
							)
						}
						className='bg-white/90 hover:bg-red-50 border border-gray-200 text-gray-600 hover:text-red-600 px-3 py-1 rounded-lg text-xs font-medium transition'
					>
						<FaRegTrashAlt size={16} />
					</button>
				</div>
			)}
		</div>
	);
};
