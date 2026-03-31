import Link from 'next/link';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaPencilRuler, FaRegTrashAlt } from 'react-icons/fa';

import { Avatar } from '@/entities/avatars';
import { useConfirm } from '@/shared/hooks/useConfirmModal';
import { Button } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';

import { useDeleteDonaterMutation } from '../api/donatersApi';
import { Donater } from '../model/types';

export const DonatersCard = ({
	donater,
	showAdminActions,
}: {
	donater: Donater;
	showAdminActions?: boolean;
}) => {
	const { t } = useTranslation();

	const [deleteDonater] = useDeleteDonaterMutation();

	const handleDelete = async () => await deleteDonater(donater.id);

	const { confirmProps, confirm } = useConfirm();

	return (
		<div className='flex flex-col items-center justify-center text-center gap-4 p-4 w-full max-w-5xl rounded-2xl bg-white border border-gray-300 relative'>
			<ConfirmModal {...confirmProps} />
			<div
				className={clsx(
					'h-64 min-w-64 rounded-2xl flex items-center justify-center',
					!donater.image && 'border border-gray-200',
				)}
			>
				<Avatar src={donater.image} className='rounded-2xl' />
			</div>
			<h1>{donater.name}</h1>
			<p>{donater.description}</p>
			{showAdminActions && (
				<div className='flex gap-1 pl-1 absolute top-4 right-4'>
					<Link
						title={t('buttons.editDonater')}
						href={`/donate/${donater.id}/edit`}
						className='bg-white/90 hover:bg-blue-50 border border-gray-200 text-gray-600 hover:text-blue-600 px-3 py-1 rounded-lg text-xs font-medium transition'
					>
						<FaPencilRuler size={16} />
					</Link>
					<Button
						variant='ghost'
						type='button'
						title={t('buttons.deleteDonater')}
						onClick={() =>
							confirm(t('buttons.deleteDonater'), handleDelete, 'delete')
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
