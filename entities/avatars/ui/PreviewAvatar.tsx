import Image from 'next/image';

import { MdNoPhotography } from 'react-icons/md';

export const PreviewAvatar = ({ avatar }: { avatar?: string }) => {
	return (
		<div className='rounded-[50%] bg-gray-100 min-w-[64px] min-h-[64px] w-[64px] h-[64px] flex items-center justify-center border-black border overflow-hidden'>
			{avatar ? (
				<Image
					src={avatar}
					alt='avatar'
					className='w-full h-full object-cover'
				/>
			) : (
				<MdNoPhotography />
			)}
		</div>
	);
};
