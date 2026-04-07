import { Article } from '@/entities/articles';
import { EventType } from '@/entities/events';
import { NewsType } from '@/entities/news';
import { useIsMobile } from '@/shared/custom-hooks';

import { PreviewCard } from './PreviewCard';

type Props = {
	items: EventType[] | NewsType[] | Article[];
	type: 'events' | 'news' | 'articles';
	onDelete?: (slug: string) => void;
	onPublish?: (slug: string) => void;
	onUnpublish?: (slug: string) => void;
};

export const PreviewCardsList = ({
	items,
	type,
	onDelete,
	onPublish,
	onUnpublish,
}: Props) => {
	const isMobile = useIsMobile();

	return (
		<div className='flex flex-1 flex-col gap-4'>
			{items.map((item, index) => (
				<PreviewCard
					key={item.slug}
					item={item}
					type={type}
					index={index}
					onDelete={onDelete}
					onPublish={onPublish}
					onUnpublish={onUnpublish}
					layout={isMobile ? 'vertical' : 'horizontal'}
				/>
			))}
		</div>
	);
};
