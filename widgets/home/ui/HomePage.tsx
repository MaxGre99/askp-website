'use client';

import { useEffect } from 'react';

import { useGetAllEventsQuery } from '@/entities/events';
import { useGetAllNewsQuery } from '@/entities/news';
import { useGetAllProfilesQuery } from '@/entities/profiles';

import { HomeEvents } from './HomeEvents';
import { HomeFeedback } from './HomeFeedback';
import { HomeNewsSlider } from './HomeNewsSlider';
import { HomeSpecialistsSlider } from './HomeSpecialistsSlider';

export const HomePage = () => {
	const { data: newsData, isError: isNewsError } = useGetAllNewsQuery({
		page: 1,
		pageSize: 10,
	});
	const { data: eventsData, isError: isEventsError } = useGetAllEventsQuery({
		page: 1,
		pageSize: 4,
	});
	const { data: profilesData, isError: isProfilesError } =
		useGetAllProfilesQuery({ page: 1, pageSize: 10 });

	useEffect(() => {
		if (isNewsError) console.error('Failed to load news');
		if (isEventsError) console.error('Failed to load events');
		if (isProfilesError) console.error('Failed to load profiles');
	}, [isNewsError, isEventsError, isProfilesError]);

	return (
		<>
			{newsData && <HomeNewsSlider items={newsData.news} />}
			{eventsData && <HomeEvents items={eventsData.events} />}
			{profilesData && <HomeSpecialistsSlider items={profilesData.profiles} />}
			<HomeFeedback />
		</>
	);
};
