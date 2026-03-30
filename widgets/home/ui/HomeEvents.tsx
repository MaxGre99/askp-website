'use client';

import { useTranslation } from 'react-i18next';

import { EventType } from '@/entities/events';
import { NavButton } from '@/shared/ui/NavButton';
import { WideCard } from '@/shared/ui/WideCard';

type Props = {
	items: EventType[];
};

export const HomeEvents = ({ items }: Props) => {
	const { t } = useTranslation();

	return (
		<section className='flex flex-col gap-4 w-full'>
			<h1 className='font-oswald text-white font-light'>
				{t('events.homeTitle')}:
			</h1>
			<div className='flex flex-col gap-3'>
				{items.length > 0 ? (
					<>
						{items.slice(0, 4).map((event, index) => {
							return (
								<WideCard
									key={event.slug}
									index={index}
									item={event}
									type='events'
								/>
							);
						})}

						<div className='flex justify-end'>
							<NavButton href='/events'>{t('buttons.showAll')}</NavButton>
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
