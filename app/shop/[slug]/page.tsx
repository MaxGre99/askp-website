'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { FiChevronLeft, FiChevronRight, FiShoppingBag } from 'react-icons/fi';
import { MdImageNotSupported } from 'react-icons/md';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetProductQuery } from '@/entities/products';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import 'swiper/css';

export default function ProductPage() {
	const { slug } = useParams();
	const { data: product, isLoading } = useGetProductQuery(slug as string);
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	if (isLoading)
		return (
			<div className='flex flex-1 items-center justify-center'>
				<div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
			</div>
		);

	if (!product)
		return (
			<div className='flex flex-1 items-center justify-center text-white font-oswald text-2xl'>
				Товар не найден
			</div>
		);

	const hasImages = product.images.length > 0;

	return (
		<div className='flex flex-1 w-full flex-col gap-8'>
			{/* Hero секция */}
			<div className='bg-white rounded-2xl overflow-hidden'>
				<div className='flex flex-col lg:flex-row gap-0'>
					{/* Слайдер */}
					<div className='lg:w-[55%] flex flex-col gap-3 p-6 bg-gray-50 border-r border-gray-100 justify-center'>
						{hasImages ? (
							<>
								{/* Основной слайдер */}
								<div className='relative rounded-xl overflow-hidden bg-white'>
									<Swiper
										loop
										modules={[Navigation, Pagination, Thumbs]}
										thumbs={{
											swiper:
												thumbsSwiper && !thumbsSwiper.destroyed
													? thumbsSwiper
													: null,
										}}
										navigation={{
											nextEl: '.product-next',
											prevEl: '.product-prev',
										}}
										pagination={{ clickable: true }}
										className='w-full aspect-video'
									>
										{product.images.map((img, i) => (
											<SwiperSlide key={i}>
												<img
													src={img}
													alt={`${product.name} — фото ${i + 1}`}
													className='w-full h-full object-fill'
												/>
											</SwiperSlide>
										))}
									</Swiper>

									{/* Кастомные кнопки навигации */}
									{product.images.length > 1 && (
										<>
											<button className='product-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition'>
												<FiChevronLeft size={18} />
											</button>
											<button className='product-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition'>
												<FiChevronRight size={18} />
											</button>
										</>
									)}
								</div>

								{/* Превью-миниатюры */}
								{/* {product.images.length > 1 && (
									<Swiper
										modules={[Thumbs]}
										onSwiper={setThumbsSwiper}
										slidesPerView={Math.min(product.images.length, 5)}
										spaceBetween={8}
										watchSlidesProgress
										className='w-full'
									>
										{product.images.map((img, i) => (
											<SwiperSlide key={i}>
												<div className='aspect-square rounded-lg overflow-hidden cursor-pointer ring-2 ring-transparent [.swiper-slide-thumb-active_&]:ring-blue-500 transition'>
													<img
														src={img}
														alt=''
														className='w-full h-full object-cover'
													/>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								)} */}
							</>
						) : (
							<div className='aspect-[4/3] rounded-xl bg-gray-100 flex items-center justify-center'>
								<MdImageNotSupported size={64} className='text-gray-300' />
							</div>
						)}
					</div>

					{/* Инфо */}
					<div className='lg:w-[45%] flex flex-col gap-6 p-8'>
						<div className='flex flex-col gap-2'>
							<span className='text-xs font-medium text-blue-500 uppercase tracking-widest'>
								Курс
							</span>
							<h1 className='font-oswald text-3xl font-medium leading-tight'>
								{product.name}
							</h1>
						</div>

						<div className='h-px bg-gray-100' />

						<div className='flex flex-col gap-1'>
							<span className='text-sm text-gray-500'>Стоимость</span>
							<span className='text-4xl font-oswald font-semibold text-gray-900'>
								{product.price.toLocaleString('ru-RU')}{' '}
								<span className='text-2xl'>₽</span>
							</span>
						</div>

						<button className='flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25'>
							<FiShoppingBag size={20} />
							Купить курс
						</button>

						<div className='flex flex-col gap-2 p-4 bg-blue-50 rounded-xl text-sm text-blue-700'>
							<p>✓ Мгновенный доступ после оплаты</p>
							<p>✓ Ссылка на курс придёт на email</p>
							<p>✓ Бессрочный доступ к материалам</p>
						</div>
					</div>
				</div>
			</div>

			{/* Описание */}
			{product.description && (
				<div className='bg-white rounded-2xl p-8 flex flex-col gap-4'>
					<h2 className='font-oswald text-2xl font-medium'>О курсе</h2>
					<div className='h-px bg-gray-100' />
					<TipTapReadOnly content={product.description} noBorder />
				</div>
			)}
		</div>
	);
}
