'use client';

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

	const isActive = pathname === href || pathname.startsWith(href + '/');

	const baseClasses =
		'hover:bg-white/15 active:bg-white/20 transition-all duration-200 text-2xl text-white mx-auto font-bad-script w-full h-[140px] p-3 rounded-2xl flex items-center justify-center flex items-center justify-center text-center';

	return (
		<Link
			href={href}
			className={clsx(
				baseClasses,
				isActive && 'bg-white/20 ring-1 ring-white/40',
				className,
			)}
		>
			{children}
		</Link>
	);
};

export default NavBtn;
