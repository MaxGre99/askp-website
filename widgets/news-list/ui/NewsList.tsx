import { News } from '@/entities/news';
import { EventCard } from '@/shared/ui/EventCard';

type Props = {
	items: News[];
};

export const NewsList = ({ items }: Props) => {
	return (
		<div className='flex flex-col gap-4'>
			{items.map((item, index) => (
				<EventCard key={item.slug} event={item} index={index} type='news' />
			))}
		</div>
	);
};
