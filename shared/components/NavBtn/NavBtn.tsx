import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';

interface NavBtnProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

const NavBtn = ({ href, children, className }: NavBtnProps) => {
	const pathname = usePathname();

	const isActive =
		href === '/'
			? pathname === '/'
			: pathname === href || pathname.startsWith(href + '/');

	return (
		<Link
			href={href}
			className={clsx(
				'relative w-full h-[140px] p-3',
				'flex items-center justify-center text-center',
				'font-bad-script text-2xl rounded-2xl',
				'text-white',
				'group',
				className,
			)}
		>
			{/* базовый текст */}
			<span>{children}</span>

			{/* анимированный слой */}
			<span
				aria-hidden
				className={clsx(
					'absolute inset-0 flex items-center justify-center',
					'text-transparent bg-clip-text [-webkit-background-clip:text]',
					'bg-linear-to-r from-amber-500 to-amber-500',
					'bg-no-repeat bg-left',
					'bg-size-[0%_100%]',
					'transition-[background-size] duration-300 ease-out',
					'group-hover:bg-size-[100%_100%]',
					isActive && 'bg-size-[100%_100%]',
				)}
			>
				{children}
			</span>
		</Link>
	);
};

export default NavBtn;
