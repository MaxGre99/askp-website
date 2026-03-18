import Link from 'next/link';

import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
	variant?: 'ghost' | 'blue';
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
	const baseClasses = clsx(
		'flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 text-white p-3 rounded-2xl font-inter text-base',
		variant === 'blue'
			? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-400 disabled:opacity-50'
			: 'hover:bg-white/15 active:bg-white/20',
		isActive && (variant === 'blue' ? 'bg-blue-600' : 'bg-white/25'),
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
