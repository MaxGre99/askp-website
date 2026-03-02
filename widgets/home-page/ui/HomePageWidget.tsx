'use client';

import { useGetAllEventsQuery } from '@/entities/events';
import { useGetAllNewsQuery } from '@/entities/news';

import { HomeEvents } from './HomeEvents';
import { HomeFeedback } from './HomeFeedback';
import { HomeSlider } from './HomeSlider';

export const HomePageWidget = () => {
	const { data: newsData } = useGetAllNewsQuery({ page: 1, pageSize: 10 });
	const { data: eventsData } = useGetAllEventsQuery({ page: 1, pageSize: 4 });

	return (
		<>
			{newsData && <HomeSlider items={newsData.news} />}
			{eventsData && <HomeEvents items={eventsData.events} />}
			<HomeFeedback />
		</>
	);
};
