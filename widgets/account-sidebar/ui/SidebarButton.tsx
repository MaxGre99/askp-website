import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

type Props = {
	href: string;
	children: React.ReactNode;
	className?: string;
};

export const SidebarButton = ({ href, children, className }: Props) => {
	const pathname = usePathname();

	const isActive =
		href === '/'
			? pathname === '/'
			: pathname === href || pathname.startsWith(href + '/');

	const base =
		'flex items-center justify-start w-full gap-3 px-4 py-3 rounded-2xl transition-colors';

	const inactive = 'text-gray-700 hover:bg-gray-100 active:bg-gray-200';

	const active = 'bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600';

	return (
		<Link
			href={href}
			className={clsx(base, isActive ? active : inactive, className)}
		>
			{children}
		</Link>
	);
};
