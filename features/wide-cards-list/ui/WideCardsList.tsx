import { Article } from '@/entities/articles';
import { EventType } from '@/entities/events';
import { NewsType } from '@/entities/news';
import { WideCard } from '@/shared/ui/WideCard';

type Props = {
	items: NewsType[] | EventType[] | Article[];
	onDelete?: (slug: string) => void;
};

export const WideCardsList = ({ items, onDelete }: Props) => {
	return (
		<div className='flex flex-1 flex-col gap-4'>
			{items.map((item, index) => (
				<WideCard
					key={item.slug}
					item={item}
					index={index}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};
