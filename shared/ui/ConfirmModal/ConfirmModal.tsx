'use client';

import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';

interface Props {
	isOpen: boolean;
	title: string;
	type?: 'confirm' | 'delete';
	onConfirm: () => void;
	onCancel: () => void;
}

export const ConfirmModal = ({
	isOpen,
	title,
	type = 'confirm',
	onConfirm,
	onCancel,
}: Props) => {
	const { t } = useTranslation();
	if (!isOpen) return null;

	const isConfirm = type === 'confirm';

	const modalRoot = document.getElementById('modal-root');

	return createPortal(
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'
			onClick={onCancel}
		>
			<div
				className='bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 flex flex-col gap-4'
				onClick={(e) => e.stopPropagation()}
			>
				<p className='text-gray-800 text-center font-medium'>{title}?</p>
				<div className='flex gap-3 justify-center'>
					<Button
						variant='white'
						onClick={onCancel}
						className='px-5 py-2 rounded-xl text-gray-600! transition text-sm'
					>
						{t('buttons.cancel')}
					</Button>
					<Button
						onClick={onConfirm}
						className={clsx(
							'px-5 py-2 rounded-xl text-white transition text-sm',
							isConfirm
								? 'bg-green-500! hover:bg-green-600! active:bg-green-400! border-green-500!'
								: 'bg-red-500! hover:bg-red-600! active:bg-red-400! border-red-500!',
						)}
					>
						{t('buttons.confirm')}
					</Button>
				</div>
			</div>
		</div>,
		modalRoot!,
	);
};
