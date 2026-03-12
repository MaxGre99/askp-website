import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

interface NavButtonProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export const NavButton = ({ href, children, className }: NavButtonProps) => {
	const pathname = usePathname();

	const baseClasses =
		'flex items-center justify-center hover:bg-white/15 hover:cursor-pointer active:bg-white/20 transition-all duration-200 text-2xl text-white mx-auto font-oswald p-4 rounded-2xl';

	const isActive =
		href === '/'
			? pathname === '/'
			: pathname === href || pathname.startsWith(href + '/');

	return (
		<Link
			href={href}
			className={clsx(
				// 'relative w-full h-[140px] p-3',
				// 'flex items-center justify-center text-center',
				// 'font-oswald text-2xl rounded-2xl',
				// 'text-white',
				// 'group',
				isActive ? 'bg-white/25 ring-1 ring-white/40' : '',
				baseClasses,
				className,
			)}
		>
			{/* базовый текст */}
			<span>{children}</span>

			{/* анимированный слой */}
			{/* <span
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
			</span> */}
		</Link>
	);
};

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// import clsx from 'clsx';

// interface NavButtonProps {
// 	href: string;
// 	children: React.ReactNode;
// 	className?: string;
// }

// export const NavButton = ({ href, children, className }: NavButtonProps) => {
// 	const pathname = usePathname();

// 	const isActive =
// 		href === '/'
// 			? pathname === '/'
// 			: pathname === href || pathname.startsWith(href + '/');

// 	return (
// 		<Link
// 			href={href}
// 			className={clsx(
// 				'relative p-3',
// 				'flex items-center justify-center text-center',
// 				'font-oswald text-2xl rounded-2xl',
// 				'text-white',
// 				'group',
// 				className,
// 			)}
// 		>
// 			{/* базовый текст */}
// 			<span>{children}</span>

// 			{/* анимированный слой */}
// 			<span
// 				aria-hidden
// 				className={clsx(
// 					'absolute inset-0 flex items-center justify-center',
// 					'text-transparent bg-clip-text [-webkit-background-clip:text]',
// 					'bg-linear-to-r from-amber-500 to-amber-500',
// 					'bg-no-repeat bg-left',
// 					'bg-size-[0%_100%]',
// 					'transition-[background-size] duration-300 ease-out',
// 					'group-hover:bg-size-[100%_100%]',
// 					isActive && 'bg-size-[100%_100%]',
// 				)}
// 			>
// 				{children}
// 			</span>
// 		</Link>
// 	);
// };
