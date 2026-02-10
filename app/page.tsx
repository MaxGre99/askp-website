'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import mockImg from '../public/mockNews.webp';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import EventCard from '@/shared/components/EventCard/EventCard';
import NewsCard from '@/shared/components/NewsCard/NewsCard';
import { useState } from 'react';
import FeedbackForm from '@/shared/components/FeedbackForm/FeedbackForm';
import Button from '@/shared/components/Button/Button';
import NavBtn from '@/shared/components/NavBtn/NavBtn';
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { t } = useTranslation();
	const mockNewsExample = {
		title:
			'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas leo sapien, molestie quis porttitor vel, scelerisque non lacus. Donec sapien metus, ornare vitae ante eu, volutpat sagittis enim. Donec feugiat erat non ante consectetur viverra. Pellentesque cursus justo vel quam viverra varius a sit amet dui. Donec in nunc mauris. Nam iaculis, turpis eget porta pellentesque, erat tellus porttitor urna, in lacinia lacus leo a lorem. Phasellus cursus ligula in lobortis commodo. In posuere ornare tellus at porta. Phasellus facilisis quis lacus non aliquam. Fusce mauris lectus, varius eleifend neque nec, sagittis venenatis magna. Vestibulum blandit metus a nulla efficitur, eget congue odio pretium. Curabitur id justo vel sapien ultrices bibendum pharetra sed sem. Cras sodales libero sed condimentum gravida. Integer et enim nec enim varius tincidunt. Vestibulum mauris tortor, consequat et maximus at, hendrerit varius augue. Aliquam vulputate massa sit amet augue venenatis ullamcorper. Quisque commodo, ex iaculis viverra suscipit, erat nunc vestibulum velit, sit amet congue ipsum ligula in velit. Nam facilisis, urna et tempus imperdiet, tellus neque tincidunt nunc, eu aliquam mauris erat et nisi. Proin augue dolor, accumsan gravida bibendum eget, facilisis ut odio. Donec gravida nibh sollicitudin ex laoreet, in pretium urna sagittis. Quisque tincidunt velit turpis, eu rutrum purus porttitor eget. Sed egestas sodales dolor, vitae tristique arcu viverra ut. Quisque vehicula eget nisl a vehicula. Curabitur in libero id libero iaculis tristique. Sed luctus arcu at cursus pellentesque. Donec id sapien neque. Vestibulum iaculis, purus vel pellentesque placerat, massa arcu ultricies ligula, quis aliquet est augue sit amet lacus. Vestibulum luctus, ipsum interdum rutrum aliquet, sapien nibh faucibus neque, eget aliquam risus neque maximus lacus. Duis lorem leo, sollicitudin sit amet fermentum aliquam, commodo ut odio. Curabitur quis ex pulvinar, dignissim lectus vel, pharetra justo. In sed malesuada lorem. Praesent lacinia, lectus et posuere maximus, libero mauris porttitor eros, in cursus turpis diam ut nibh. Donec eget dui dui. Quisque ultrices pretium felis at lacinia. In hendrerit lacinia purus, eu hendrerit leo ullamcorper vel. Quisque et orci sed nibh ullamcorper tincidunt nec vitae eros. Proin pellentesque, quam non lacinia tincidunt, magna ante vehicula magna, vel aliquet diam felis commodo ligula. Sed in odio a ipsum dictum fringilla sed vitae erat. Curabitur diam lectus, volutpat ut dignissim sit amet, luctus quis nulla. Ut malesuada a sapien ut vulputate. Pellentesque quis gravida diam, eget interdum erat. Suspendisse at libero suscipit, pharetra lacus quis, pharetra massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut varius ante sit amet lorem rutrum sodales. Praesent scelerisque vulputate odio vel faucibus. Maecenas ac faucibus dolor. Praesent tincidunt velit nec felis ornare, et placerat mi mattis. Maecenas mollis, dui facilisis pharetra dignissim, magna metus viverra odio, et tincidunt augue lorem vitae nisi. Praesent nibh libero, ornare at sem non, luctus pellentesque velit. Suspendisse enim leo, sagittis quis fermentum non, gravida id purus.',
		img: mockImg,
		link: 'https://www.google.com/search?q=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0+%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F&oq=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0+%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiABDIICAIQABgWGB4yCggDEAAYChgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg0MTY4ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#sv=CAMSZxowKg5TU010ZEZwZGRibEtzTTIOU1NNdGRGcGRkYmxLc006DnluSzZkY09DaTI0NTZNIAQqLwobX3o5bGNhY3ljREpLUHhjOFBvLXFveUF3XzkzEg5TU010ZEZwZGRibEtzTRgAMAEYByDcx9eOBzACSgoIAhACGAIgAigC',
		updatedAt: '10.10.2010',
		slug: 'main-page-news',
	};

	const mockNews = Array(10).fill(mockNewsExample);

	const [type, setType] = useState<'cooperation' | 'consultation'>(
		'cooperation',
	);

	return (
		<>
			<section className='flex flex-col gap-3'>
				<h1 className='font-bad-script text-white'>{t('news.homeTitle')}:</h1>
				<Swiper
					modules={[Pagination, Autoplay]}
					direction='horizontal'
					loop
					slidesPerView={3}
					spaceBetween={20}
					className='w-full px-5!'
					// pagination={{
					// 	type: 'bullets',
					// 	// clickable: true,
					// }}
					freeMode
					speed={10000} // ← скорость движения (чем больше — тем плавнее)
					autoplay={{
						delay: 0,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
				>
					{mockNews.map((article, index) => {
						return (
							<SwiperSlide key={index}>
								<NewsCard article={article} type='news' />
							</SwiperSlide>
						);
					})}
				</Swiper>
				<div className='flex justify-end mr-6 mt-1 text-white text-2xl font-bad-script'>
					<NavBtn className='w-fit! h-fit mx-0!' href='/news'>
						{t('buttons.showAll')}
					</NavBtn>
				</div>
			</section>
			<section className='flex flex-col gap-3'>
				<h1 className='font-bad-script text-white'>{t('events.homeTitle')}:</h1>
				<div className='flex flex-col gap-3'>
					{mockNews.slice(0, 4).map((event, index) => {
						return (
							<EventCard
								key={index}
								index={index}
								event={event}
								type='events'
							/>
						);
					})}
				</div>
				<div className='flex justify-end mr-6 mt-1 text-white text-2xl font-bad-script'>
					<NavBtn className='w-fit! h-fit mx-0!' href='/events'>
						{t('buttons.showAll')}
					</NavBtn>
				</div>
			</section>
			<section className='text-white flex flex-col gap-5 items-center'>
				<h1 className='font-bad-script'>{t('feedbackForm.title')}</h1>
				<div className='relative flex bg-white/20 rounded-full w-fit'>
					{/* Анимированный индикатор */}
					<div
						className={`absolute top-0 bottom-0 w-1/2 rounded-full bg-blue-500/70 transition-transform duration-300 ease-out
							${type === 'cooperation' ? 'translate-x-0' : 'translate-x-full'}`}
					/>

					<Button
						type='button'
						onClick={() => setType('cooperation')}
						className='relative z-10 px-6 py-3 text-white font-medium w-1/2! h-fit! font-inter text-lg hover:bg-transparent!'
					>
						{t('feedbackForm.buttons.cooperation')}
					</Button>

					<Button
						type='button'
						onClick={() => setType('consultation')}
						className='relative z-10 px-6 py-3 text-white font-medium w-1/2 h-fit! font-inter text-lg hover:bg-transparent!'
					>
						{t('feedbackForm.buttons.consultation')}
					</Button>
				</div>
				<FeedbackForm type={type} />
			</section>
		</>
	);
};

export default Home;
