'use client';

import { useGetAllNewsQuery } from '@/entities/news';
import { useGetAllEventsQuery } from '@/entities/events';
import { HomeSlider } from './HomeSlider';
import { HomeEvents } from './HomeEvents';
import { HomeFeedback } from './HomeFeedback';

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
