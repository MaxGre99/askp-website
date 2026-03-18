import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Profile } from '@/entities/profiles';
import { NavButton } from '@/shared/ui/NavButton';

import { ProfileCard } from './ProfileCard';

type Props = {
	items: Profile[];
};

export const HomeSpecialistsSlider = ({ items }: Props) => {
	const { t } = useTranslation();

	const SLIDES_PER_VIEW = 5;

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
			<h1 className='font-oswald text-white font-light'>
				{t('specialists.homeTitle')}:
			</h1>
			{items.length > 0 ? (
				<>
					<Swiper
						modules={[Autoplay]}
						direction='horizontal'
						loop
						slidesPerView={SLIDES_PER_VIEW}
						spaceBetween={200}
						className='w-full px-5'
						freeMode
						speed={10000}
						autoplay={{
							delay: 0,
							disableOnInteraction: false,
							pauseOnMouseEnter: true,
						}}
					>
						{slides.map((profile, i) => (
							<SwiperSlide key={`${profile.userId}-${i}`} className='p-1'>
								<ProfileCard profile={profile} />
							</SwiperSlide>
						))}
					</Swiper>

					<div className='flex justify-end'>
						<NavButton href='/specialists'>{t('buttons.lookAll')}</NavButton>
					</div>
				</>
			) : (
				<p className='font-oswald text-white text-3xl'>
					{t('notifications.empty')}
				</p>
			)}
		</section>
	);
};
