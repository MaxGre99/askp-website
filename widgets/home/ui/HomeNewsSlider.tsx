'use client';

import { useTranslation } from 'react-i18next';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NewsCard, NewsType } from '@/entities/news';
import { NavButton } from '@/shared/ui/NavButton';

type Props = {
	items: NewsType[];
};

export const HomeNewsSlider = ({ items }: Props) => {
	const { t } = useTranslation();

	const SLIDES_PER_VIEW = 3;

	// Дублируем пока не наберётся достаточно
	const slides =
		items.length === 0
			? []
			: items.length < SLIDES_PER_VIEW * 2
				? Array.from({
						length: Math.ceil((SLIDES_PER_VIEW * 2) / items.length),
					}).flatMap(() => items)
				: items;

	return (
		<section className='flex flex-col gap-5 w-full'>
			<h1 className='font-oswald text-white'>{t('news.homeTitle')}:</h1>

			{items.length > 0 ? (
				<Swiper
					modules={[Pagination, Autoplay]}
					direction='horizontal'
					loop
					slidesPerView={SLIDES_PER_VIEW}
					spaceBetween={20}
					className='w-full px-5'
					freeMode
					speed={10000}
					autoplay={{
						delay: 0,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
				>
					{slides.map((news, i) => (
						<SwiperSlide key={`${news.slug}-${i}`}>
							<NewsCard news={news} type='news' />
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<p className='font-oswald text-white text-3xl'>
					{t('notifications.empty')}
				</p>
			)}
			{items.length > 0 && (
				<div className='flex justify-end mr-6 text-white text-2xl font-oswald'>
					<NavButton className='w-fit! h-fit mx-0!' href='/news'>
						{t('buttons.showAll')}
					</NavButton>
				</div>
			)}
		</section>
	);
};
