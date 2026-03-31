// import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { BiShow, BiSolidHide } from 'react-icons/bi';
import { FaPencilRuler, FaRegTrashAlt } from 'react-icons/fa';
import { MdImageNotSupported } from 'react-icons/md';

import { Article } from '@/entities/articles';
import { EventType } from '@/entities/events';
import { NewsType } from '@/entities/news';
import { useGetMeQuery } from '@/entities/users';
import { useConfirm } from '@/shared/hooks/useConfirmModal';
import { getAuthorName } from '@/shared/lib/getAuthorName';
import { stripHtml } from '@/shared/lib/stripHtml';

import { Button } from '../Button';
import { ConfirmModal } from '../ConfirmModal';

interface WideCardProps {
	index: number;
	item: EventType | NewsType | Article;
	type: 'events' | 'news' | 'articles';
	onDelete?: (slug: string) => void;
	onPublish?: (slug: string) => void;
	onUnpublish?: (slug: string) => void;
}

export const WideCard = ({
	index,
	item,
	type,
	onDelete,
	onPublish,
	onUnpublish,
}: WideCardProps) => {
	const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
	const { t } = useTranslation();

	const { confirmProps, confirm } = useConfirm();

	const pathname = usePathname();
	const showActions = pathname.includes('/account/');
	const showAdminActions = !isLoadingUser && user && user.role !== 'USER';

	const isEven = index % 2 === 0;
	// const type =
	// 	'eventDate' in item ? 'events' : 'content' in item ? 'news' : 'articles';
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
			<ConfirmModal {...confirmProps} />
			<Link href={`/${type}/${item.slug}`}>
				<article
					className={clsx(
						'bg-white rounded-2xl border border-gray-300 overflow-hidden transition hover:scale-[1.01] flex gap-2 h-[192px]',
						isEven ? 'flex-row' : 'flex-row-reverse',
					)}
				>
					<div
						className={clsx(
							'flex rounded-2xl h-full w-[320px] border-gray-200',
							!item?.image && 'items-center justify-center',
							isEven ? 'border-r' : 'border-l',
						)}
					>
						{item?.image ? (
							<img
								src={item.image}
								alt='card-cover'
								className='object-fill rounded-2xl w-full h-full'
							/>
						) : (
							<MdImageNotSupported size={48} />
						)}
					</div>

					<div className='p-4 flex flex-col justify-between flex-1'>
						<div className='min-h-0 overflow-hidden'>
							<h3 className='line-clamp-1 font-semibold text-lg'>
								{item.title}
							</h3>
							<p className='line-clamp-5 text-sm flex-1 min-h-0 text-elipsis '>
								{text}
							</p>
						</div>
						<div className='flex items-center gap-4'>
							<div className='flex items-center gap-4'>
								{showActions && (
									<span
										className={clsx(
											'w-fit px-2.5 py-1 rounded-full text-xs font-medium',
											item.published && 'bg-green-100 text-green-700',
											!item.published && 'bg-gray-100 text-gray-600',
										)}
									>
										{t(
											`labels.${item.published ? 'published' : 'notPublished'}`,
										)}
									</span>
								)}
								<span className='text-xs shrink-0 text-gray-600'>
									{localDateTime}
								</span>
							</div>
							{'author' in item && item.author && (
								<span className='text-xs shrink-0 text-gray-600'>
									{getAuthorName(item.author)}
								</span>
							)}
						</div>
					</div>
				</article>
			</Link>
			{showActions && (
				<div className='flex gap-1 pl-1'>
					{showAdminActions &&
						(!item.published ? (
							<Button
								variant='ghost'
								title={t(`buttons.publish${type}`)}
								type='button'
								onClick={() =>
									confirm(t(`buttons.publish${type}`), () =>
										onPublish?.(item.slug),
									)
								}
								className='bg-white/90! hover:bg-green-50! border-gray-200! text-gray-600! hover:text-green-600! px-3 py-1 rounded-lg text-xs font-medium'
							>
								<BiShow size={16} />
							</Button>
						) : (
							<Button
								variant='ghost'
								title={t(`buttons.unpublish${type}`)}
								type='button'
								onClick={() =>
									confirm(
										t(`buttons.unpublish${type}`),
										() => onUnpublish?.(item.slug),
										'delete',
									)
								}
								className='bg-white/90! hover:bg-gray-400! border-gray-200! text-gray-600! hover:text-white! px-3 py-1 rounded-lg text-xs font-medium'
							>
								<BiSolidHide size={16} />
							</Button>
						))}
					<Link
						title={t(`buttons.edit${type}`)}
						href={`${type}/${item.slug}/edit`}
						className='bg-white/90 hover:bg-blue-50 border border-gray-200 text-gray-600 hover:text-blue-600 px-3 py-1 rounded-lg text-xs font-medium transition'
					>
						<FaPencilRuler size={16} />
					</Link>
					<Button
						type='button'
						variant='ghost'
						title={t(`buttons.delete${type}`)}
						onClick={() =>
							confirm(
								t(`buttons.delete${type}`),
								() => onDelete?.(item.slug),
								'delete',
							)
						}
						className='bg-white/90! hover:bg-red-50! border-gray-200! text-gray-600! hover:text-red-600! px-3 py-1 rounded-lg text-xs font-medium'
					>
						<FaRegTrashAlt size={16} />
					</Button>
				</div>
			)}
		</div>
	);
};
