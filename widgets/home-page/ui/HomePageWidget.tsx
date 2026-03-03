'use client';

import { useGetAllEventsQuery } from '@/entities/events';
import { useGetAllNewsQuery } from '@/entities/news';
import { useGetProfilesQuery } from '@/entities/profiles';

import { HomeEvents } from './HomeEvents';
import { HomeFeedback } from './HomeFeedback';
import { HomeSlider } from './HomeSlider';
import HomeSpecialists from './HomeSpecialists';

export const HomePageWidget = () => {
	const { data: newsData } = useGetAllNewsQuery({ page: 1, pageSize: 10 });
	const { data: eventsData } = useGetAllEventsQuery({ page: 1, pageSize: 4 });
	const { data: profilesData } = useGetProfilesQuery();

	return (
		<>
			{newsData && <HomeSlider items={newsData.news} />}
			{eventsData && <HomeEvents items={eventsData.events} />}
			{profilesData && <HomeSpecialists items={profilesData} />}
			<HomeFeedback />
		</>
	);
};
