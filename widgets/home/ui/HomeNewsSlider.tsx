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

	return (
		<section className='flex flex-col gap-5 w-full'>
			<h1 className='font-oswald text-white'>{t('news.homeTitle')}:</h1>

			{items.length > 0 ? (
				<Swiper
					modules={[Pagination, Autoplay]}
					direction='horizontal'
					loop
					slidesPerView={3}
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
					{items.map((news) => (
						<SwiperSlide key={news.slug}>
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
