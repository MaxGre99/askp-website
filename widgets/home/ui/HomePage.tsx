'use client';

import { useGetAllEventsQuery } from '@/entities/events';
import { useGetAllNewsQuery } from '@/entities/news';
import { useGetAllProfilesQuery } from '@/entities/profiles';
import { useRedirectToast } from '@/shared/hooks/useRedirectToast';

import { HomeEvents } from './HomeEvents';
import { HomeFeedback } from './HomeFeedback';
import { HomeNewsSlider } from './HomeNewsSlider';
import { HomeSpecialistsSlider } from './HomeSpecialistsSlider';

export const HomePage = () => {
	useRedirectToast();

	const { data: newsData } = useGetAllNewsQuery({ page: 1, pageSize: 10 });
	const { data: eventsData } = useGetAllEventsQuery({ page: 1, pageSize: 4 });
	const { data: profilesData } = useGetAllProfilesQuery({
		page: 1,
		pageSize: 10,
	});

	return (
		<>
			{newsData && <HomeNewsSlider items={newsData.news} />}
			{eventsData && <HomeEvents items={eventsData.events} />}
			{profilesData && <HomeSpecialistsSlider items={profilesData.profiles} />}
			<HomeFeedback />
		</>
	);
};
