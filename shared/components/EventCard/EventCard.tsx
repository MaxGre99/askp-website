import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

interface EventCardProps {
	index: number;
	event: {
		title: string;
		content: string;
		updatedAt: string;
		slug: string;
	};
	type: string;
}

const EventCard = ({ index, event, type }: EventCardProps) => {
	const isEven = index % 2 === 0;
	const localDateTime = new Date(event.updatedAt).toLocaleString();

	return (
		<Link href={`/${type}/${event.slug}`}>
			<article
				className={clsx(
					'bg-white/70 rounded-2xl overflow-hidden transition hover:scale-[1.01] flex gap-2',
					isEven ? 'flex-row' : 'flex-row-reverse',
				)}
			>
				<Image
					src='/mockNews.webp'
					alt='event-cover'
					width={260}
					height={100}
					className='object-cover'
				/>

				<div className='p-6 flex flex-col gap-2 flex-1'>
					<h3 className='line-clamp-1 font-semibold text-lg'>{event.title}</h3>
					<p className='line-clamp-5 text-sm'>{event.content}</p>
					<span className='text-xs opacity-60'>{localDateTime}</span>
				</div>
			</article>
		</Link>
	);
};

export default EventCard;
