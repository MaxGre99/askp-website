import { EventType } from '@/entities/events';
import { NewsType } from '@/entities/news';
import { WideCard } from '@/shared/ui/WideCard';

type Props = {
	items: NewsType[] | EventType[];
	accentColor?: 'blue' | 'white';
	showAdminActions?: boolean;
	onDelete?: (slug: string) => void;
};

export const WideCardsList = ({
	items,
	accentColor,
	showAdminActions,
	onDelete,
}: Props) => {
	return (
		<div className='flex flex-col gap-4'>
			{items.map((item, index) => (
				<WideCard
					key={item.slug}
					item={item}
					index={index}
					accentColor={accentColor}
					showAdminActions={showAdminActions}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};
