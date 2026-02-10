import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
	children: ReactNode;
	active?: boolean;
};

const SidebarBtn = ({ children, active }: Props) => {
	return (
		<button
			className={clsx(
				'w-full text-left rounded-xl px-4 py-3 text-lg font-inter transition-colors',
				'hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20',
				active ? 'bg-black text-white' : 'text-gray-800',
			)}
		>
			{children}
		</button>
	);
};

export default SidebarBtn;
