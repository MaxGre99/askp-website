import { EventType } from '@/entities/events';
import { WideCard } from '@/shared/ui/WideCard';

type Props = {
	items: EventType[];
};

export const EventsList = ({ items }: Props) => {
	return (
		<div className='flex flex-col gap-4'>
			{items.map((item, index) => (
				<WideCard key={item.slug} item={item} index={index} />
			))}
		</div>
	);
};
