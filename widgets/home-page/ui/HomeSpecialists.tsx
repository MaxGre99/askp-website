import { useTranslation } from 'react-i18next';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Profile } from '@/entities/profiles';
import { ProfileCard } from '@/entities/profiles/ui/ProfileCard';

type Props = {
	items: Profile[];
};

const HomeSpecialists = ({ items }: Props) => {
	const { t } = useTranslation();

	const x3 = [...items, ...items, ...items];

	console.log(x3);
	return (
		<section className='flex flex-col gap-5 w-full'>
			<h1 className='font-bad-script text-white'>{t('profiles.homeTitle')}:</h1>
			{items.length > 0 ? (
				<Swiper
					modules={[Pagination, Autoplay]}
					direction='horizontal'
					loop
					slidesPerView={5}
					spaceBetween={150}
					className='w-full px-5'
					freeMode
					speed={10000}
					autoplay={{
						delay: 0,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
				>
					{x3.map((profile) => {
						return (
							<SwiperSlide key={profile.userId}>
								<ProfileCard key={profile.userId} profile={profile} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			) : (
				<p className='font-bad-script text-white text-3xl'>
					{t('notifications.empty')}
				</p>
			)}
		</section>
	);
};

export default HomeSpecialists;
