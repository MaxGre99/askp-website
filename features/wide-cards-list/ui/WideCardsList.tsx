import { Article } from '@/entities/articles';
import { EventType } from '@/entities/events';
import { NewsType } from '@/entities/news';
import { WideCard } from '@/shared/ui/WideCard';

type Props = {
	items: EventType[] | NewsType[] | Article[];
	type: 'events' | 'news' | 'articles';
	onDelete?: (slug: string) => void;
	onPublish?: (slug: string) => void;
	onUnpublish?: (slug: string) => void;
};

export const WideCardsList = ({
	items,
	type,
	onDelete,
	onPublish,
	onUnpublish,
}: Props) => {
	return (
		<div className='flex flex-1 flex-col gap-4'>
			{items.map((item, index) => (
				<WideCard
					key={item.slug}
					item={item}
					type={type}
					index={index}
					onDelete={onDelete}
					onPublish={onPublish}
					onUnpublish={onUnpublish}
				/>
			))}
		</div>
	);
};
