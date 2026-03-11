// import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';
import { FaPencilRuler, FaRegTrashAlt } from 'react-icons/fa';
import { MdImageNotSupported } from 'react-icons/md';

import { EventType } from '@/entities/events';
import { NewsType } from '@/entities/news';
import { stripHtml } from '@/shared/lib/stripHtml';

interface WideCardProps {
	index: number;
	item: EventType | NewsType;
	accentColor?: 'blue' | 'white';
	showAdminActions?: boolean;
	onDelete?: (slug: string) => void;
}

export const WideCard = ({
	index,
	item,
	accentColor,
	showAdminActions,
	onDelete,
}: WideCardProps) => {
	const isEven = index % 2 === 0;
	const type = 'content' in item ? 'news' : 'events';
	const text =
		'content' in item ? stripHtml(item.content) : stripHtml(item.description);
	const localDateTime = new Date(
		'eventDate' in item ? item.eventDate : item.updatedAt,
	).toLocaleString('ru-RU', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<div className='flex flex-col gap-1'>
			<Link href={`/${type}/${item.slug}`}>
				<article
					className={clsx(
						'bg-white/70 rounded-2xl overflow-hidden transition hover:scale-[1.01] flex gap-2 h-[192px]',
						isEven ? 'flex-row' : 'flex-row-reverse',
						accentColor === 'blue' ? 'border-2 border-blue-300' : '',
					)}
				>
					<div
						className={clsx(
							'flex rounded h-full w-[320px] shrink-0',
							!item?.image &&
								'items-center justify-center border border-gray-200',
						)}
					>
						{item?.image ? (
							<img
								src={item.image}
								alt='card-cover'
								className='object-fill rounded w-full h-full'
							/>
						) : (
							<MdImageNotSupported size={48} />
						)}
					</div>

					<div className='p-6 flex flex-col gap-2 flex-1 min-h-0 overflow-hidden'>
						<h3 className='line-clamp-1 font-semibold text-lg'>{item.title}</h3>
						<p className='line-clamp-4 text-sm flex-1 min-h-0'>{text}</p>
						<span className='text-xs opacity-60 shrink-0'>{localDateTime}</span>
					</div>
				</article>
			</Link>
			{showAdminActions && (
				<div className='flex gap-1 pl-1'>
					<Link
						href={`${type}/${item.slug}/edit`}
						className='bg-white/90 hover:bg-blue-50 border border-gray-200 text-gray-600 hover:text-blue-600 px-3 py-1 rounded-lg text-xs font-medium transition'
					>
						<FaPencilRuler size={16} />
					</Link>
					<button
						type='button'
						onClick={() => onDelete?.(item.slug)}
						className='bg-white/90 hover:bg-red-50 border border-gray-200 text-gray-600 hover:text-red-600 px-3 py-1 rounded-lg text-xs font-medium transition'
					>
						<FaRegTrashAlt size={16} />
					</button>
				</div>
			)}
		</div>
	);
};
