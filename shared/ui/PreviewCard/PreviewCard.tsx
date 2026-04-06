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

type LayoutType = 'vertical' | 'horizontal';

interface PreviewCardProps {
	index?: number;
	item: EventType | NewsType | Article;
	type: 'events' | 'news' | 'articles';
	layout?: LayoutType;
	onDelete?: (slug: string) => void;
	onPublish?: (slug: string) => void;
	onUnpublish?: (slug: string) => void;
}

export const PreviewCard = ({
	index = 0,
	item,
	type,
	layout = 'horizontal',
	onDelete,
	onPublish,
	onUnpublish,
}: PreviewCardProps) => {
	const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
	const { t } = useTranslation();

	const { confirmProps, confirm } = useConfirm();

	const pathname = usePathname();
	const showActions = pathname.includes('/account/');
	const showAdminActions = !isLoadingUser && user && user.role !== 'USER';

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

	const isEven = index % 2 === 0;
	const isHorizontal = layout === 'horizontal';

	// На мобильных всегда вертикально, на больших экранах в зависимости от layout
	const containerClasses = clsx(
		'bg-white rounded-2xl overflow-hidden transition hover:scale-[1.01] flex',
		showActions && 'border border-gray-300',
		isHorizontal
			? clsx(
					'min-h-[200px] h-[200px] w-full',
					isEven ? 'flex-row' : 'flex-row-reverse',
				)
			: clsx(
					'flex-col min-w-[300px] w-[300px]',
					showActions ? 'min-h-[396px] h-[396px]' : 'min-h-[368px] h-[368px]',
					'md:min-w-[360px] md:w-[360px] md:min-h-[386px] md:h-[386px]',
					'xl:min-w-[425px] xl:w-[425px] xl:min-h-[420px] xl:h-[420px]',
				),
	);

	const imageContainerClasses = clsx(
		'rounded-2xl flex items-center justify-center border-gray-200',
		isHorizontal
			? clsx('h-full min-w-[320px] w-[320px]', isEven ? 'border-r' : 'border-l')
			: clsx(
					'min-h-[180px] h-[180px] min-w-[300px] w-full border-b',
					'md:min-h-[202px] md:h-[202px]',
					'xl:min-h-[232px] xl:h-[232px]',
				),
	);

	const imageClasses = clsx('object-fill rounded-2xl w-full h-full');

	const contentClasses = clsx(
		'flex flex-col flex-1 justify-between gap-2 min-w-0 min-h-0',
		isHorizontal ? 'p-4' : 'p-3',
	);

	const textClasses = clsx('text-sm line-clamp-5');

	const footerClasses = clsx(
		'flex items-center flex-wrap',
		isHorizontal
			? 'gap-4 justify-start'
			: `gap-1 mt-auto ${showActions && 'justify-center'}`,
	);

	return (
		<div className='flex flex-col gap-1'>
			<ConfirmModal {...confirmProps} />
			<Link
				href={`/${type}/${item.slug}`}
				className={!isHorizontal ? 'flex justify-center' : ''}
			>
				<article className={containerClasses}>
					{/* Image Section */}
					<div className={imageContainerClasses}>
						{item?.image ? (
							<img src={item.image} alt='card-cover' className={imageClasses} />
						) : (
							<MdImageNotSupported size={96} />
						)}
					</div>

					{/* Content Section */}
					<div className={contentClasses}>
						<div className='flex flex-col flex-1 gap-1'>
							<h3 className='line-clamp-1 font-semibold text-ellipsis'>
								{item.title}
							</h3>
							<p className={textClasses}>{text}</p>
						</div>

						{/* Footer with metadata and actions */}
						<div className={footerClasses}>
							<div className='flex items-center gap-4'>
								{showActions && (
									<span
										className={clsx(
											'w-fit px-2.5 py-1 rounded-full text-xs font-medium shrink-0',
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

			{/* Action Buttons */}
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
