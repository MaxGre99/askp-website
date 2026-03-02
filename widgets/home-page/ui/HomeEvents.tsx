'use client';

import { useTranslation } from 'react-i18next';

import { EventType } from '@/entities/events';
import { EventCard } from '@/shared/ui/EventCard';
import { NavButton } from '@/shared/ui/NavButton';

type Props = {
	items: EventType[];
};

export const HomeEvents = ({ items }: Props) => {
	const { t } = useTranslation();

	return (
		<section className='flex flex-col gap-3 w-full'>
			<h1 className='font-bad-script text-white'>{t('events.homeTitle')}:</h1>
			<div className='flex flex-col gap-3'>
				{items.length > 0 ? (
					items.slice(0, 4).map((event, index) => {
						return (
							<EventCard
								key={event.slug}
								index={index}
								event={event}
								type='events'
							/>
						);
					})
				) : (
					<p>Тут пока пусто... :(</p>
				)}
			</div>
			<div className='flex justify-end mr-6 mt-1 text-white text-2xl font-bad-script'>
				<NavButton className='w-fit! h-fit mx-0!' href='/events'>
					{t('buttons.showAll')}
				</NavButton>
			</div>
		</section>
	);
};
