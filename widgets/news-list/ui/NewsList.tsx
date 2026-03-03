import { NewsType } from '@/entities/news';
import { EventCard } from '@/shared/ui/EventCard';

type Props = {
	items: NewsType[];
	accentColor?: 'blue' | 'white';
};

export const NewsList = ({ items, accentColor }: Props) => {
	return (
		<div className='flex flex-col gap-4'>
			{items.map((item, index) => (
				<EventCard
					key={item.slug}
					event={item}
					index={index}
					type='news'
					accentColor={accentColor}
				/>
			))}
		</div>
	);
};
