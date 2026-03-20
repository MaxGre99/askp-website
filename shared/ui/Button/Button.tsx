import Link from 'next/link';

import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
	variant?: 'blue' | 'ghost' | 'white';
	href?: string;
}

export const Button = ({
	className,
	children,
	isActive,
	variant = 'blue',
	href,
	...props
}: ButtonProps) => {
	const isBlue = variant === 'blue';
	const isGhost = variant === 'ghost';
	const isWhite = variant === 'white';

	const baseClasses = clsx(
		'flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-50 p-3 rounded-2xl font-inter text-base',
		isBlue && 'bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white',
		isGhost && 'hover:bg-white/15 active:bg-white/25 text-white',
		isWhite &&
			'bg-white text-blue-500 hover:bg-neutral-200 active:bg-neutral-100',
		isActive &&
			(isBlue
				? 'bg-blue-600'
				: isGhost
					? 'bg-white/25'
					: isWhite
						? 'active:bg-neutral-100'
						: ''),
		className,
	);

	if (href) {
		return (
			<Link href={href} className={baseClasses}>
				{children}
			</Link>
		);
	}

	return (
		<button className={baseClasses} {...props}>
			{children}
		</button>
	);
};
