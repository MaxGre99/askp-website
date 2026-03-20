// import Image from 'next/image';

import { MdOutlineNoPhotography } from 'react-icons/md';

interface AvatarProps {
	src?: string | null;
	size?: number;
	className?: string;
}

export const Avatar = ({ src, size = 64, className }: AvatarProps) => {
	return (
		<>
			{src ? (
				// <Image
				// 	src={src}
				// 	alt='avatar'
				// 	width={size}
				// 	height={size}
				// 	className='object-cover w-full h-full'
				// />
				<img
					// eslint-disable-next-line react-hooks/purity
					src={`${src}?t=${Date.now()}`}
					alt='avatar'
					className={`w-full h-full object-contain ${className}`}
				/>
			) : (
				<MdOutlineNoPhotography size={size} color='gray' />
			)}
		</>
	);
};
