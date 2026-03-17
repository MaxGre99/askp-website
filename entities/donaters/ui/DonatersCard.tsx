import Link from 'next/link';

import { FaPencilRuler, FaRegTrashAlt } from 'react-icons/fa';

import { Avatar } from '@/entities/avatars';

import { useDeleteDonaterMutation } from '../api/donatersApi';
import { Donater } from '../model/types';

export const DonatersCard = ({
	donater,
	showAdminActions,
}: {
	donater: Donater;
	showAdminActions?: boolean;
}) => {
	const [deleteDonater] = useDeleteDonaterMutation();
	const handleDelete = async () => await deleteDonater(donater.id);
	return (
		<div className='flex flex-col gap-4 items-center rounded-2xl border border-gray-300 p-4 relative'>
			<div className='max-w-[1024px] rounded-2xl flex items-center justify-center'>
				<Avatar src={donater.image} className='rounded-2xl' />
			</div>
			<h1>{donater.name}</h1>
			<p>{donater.description}</p>
			{showAdminActions && (
				<div className='flex gap-1 pl-1 absolute top-6 right-6'>
					<Link
						href={`/donate/${donater.id}/edit`}
						className='bg-white/90 hover:bg-blue-50 border border-gray-200 text-gray-600 hover:text-blue-600 px-3 py-1 rounded-lg text-xs font-medium transition'
					>
						<FaPencilRuler size={16} />
					</Link>
					<button
						type='button'
						onClick={handleDelete}
						className='bg-white/90 hover:bg-red-50 border border-gray-200 text-gray-600 hover:text-red-600 px-3 py-1 rounded-lg text-xs font-medium transition'
					>
						<FaRegTrashAlt size={16} />
					</button>
				</div>
			)}
		</div>
	);
};
