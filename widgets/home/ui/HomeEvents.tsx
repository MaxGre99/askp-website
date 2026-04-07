'use client';

import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EventType } from '@/entities/events';
import { PreviewCard } from '@/features/preview-cards';
import { PreviewCardsList } from '@/features/preview-cards';
import { useIsMobile } from '@/shared/custom-hooks';
import { NavButton } from '@/shared/ui/NavButton';

type Props = {
	items: EventType[];
};

export const HomeEvents = ({ items }: Props) => {
	const { t } = useTranslation();
	const isMobile = useIsMobile();

	const SLIDES_PER_VIEW = 4;

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
		<section className='flex flex-col gap-4 w-full'>
			<h1 className='font-oswald text-white font-light'>
				{t('events.homeTitle')}:
			</h1>
			<div className='flex flex-col gap-3'>
				{items.length > 0 ? (
					<>
						{isMobile ? (
							<Swiper
								modules={[Autoplay]}
								direction='horizontal'
								loop
								// slidesPerView={SLIDES_PER_VIEW}
								// spaceBetween={20}
								className='w-full px-5'
								freeMode
								speed={10000}
								autoplay={{
									delay: 0,
									disableOnInteraction: false,
									pauseOnMouseEnter: true,
								}}
								breakpoints={{
									0: {
										slidesPerView: 1,
									},
									540: {
										slidesPerView: 2,
										spaceBetween: 150,
									},
									768: {
										slidesPerView: 2,
									},
									912: {
										slidesPerView: 3,
										spaceBetween: 250,
									},
									1024: {
										slidesPerView: 3,
										spaceBetween: 150,
									},
									1440: {
										slidesPerView: 4,
										spaceBetween: 350,
									},
								}}
							>
								{slides.map((event, i) => (
									<SwiperSlide key={`${event.slug}-${i}`}>
										<PreviewCard item={event} type='events' layout='vertical' />
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							<PreviewCardsList items={items} type='events' />
						)}
						<div className='flex justify-end'>
							<NavButton href='/events' className='w-fit!'>
								{t('buttons.showAll')}
							</NavButton>
						</div>
					</>
				) : (
					<p className='font-oswald text-white text-3xl'>
						{t('notifications.empty')}
					</p>
				)}
			</div>
		</section>
	);
};
