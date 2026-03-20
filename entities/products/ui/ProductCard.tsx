import Link from 'next/link';

import { MdImageNotSupported } from 'react-icons/md';

import { stripHtml } from '@/shared/lib/stripHtml';

import { Product } from '../api/productsApi';

export const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Link href={`/shop/${product.slug}`}>
			<article className='bg-white rounded-2xl overflow-hidden transition hover:scale-[1.01] flex flex-col min-w-[320px] w-[320px] min-h-[320px] h-[368px]'>
				<div className='w-full h-[200px] flex items-center justify-center rounded-2xl border-b border-gray-200'>
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
					<h3 className='font-semibold line-clamp-2'>{product.name}</h3>
					<p className='text-sm text-gray-600 line-clamp-3'>
						{stripHtml(product.description)}
					</p>
					<span className='font-bold text-blue-600 mt-1'>
						{product.price} ₽
					</span>
				</div>
			</article>
		</Link>
	);
};
