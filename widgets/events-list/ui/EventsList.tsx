import { Event } from '@/entities/events';
import { EventCard } from '@/shared/ui/EventCard';

type Props = {
	items: Event[];
};

export const EventsList = ({ items }: Props) => {
	return (
		<div className='flex flex-col gap-4'>
			{items.map((item, index) => (
				<EventCard key={item.slug} event={item} index={index} type='event' />
			))}
		</div>
	);
};
