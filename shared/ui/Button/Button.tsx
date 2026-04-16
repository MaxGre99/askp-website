import Link from 'next/link';

import clsx from 'clsx';

type BaseProps = {
	isActive?: boolean;
	variant?: 'blue' | 'ghost' | 'white';
	className?: string;
	children?: React.ReactNode;
};

type AsButton = BaseProps &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		href?: undefined;
		target?: undefined;
		rel?: undefined;
	};

type AsLink = BaseProps & {
	href: string;
	target?: string;
	rel?: string;
};

type ButtonProps = AsButton | AsLink;

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
		'flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-50 p-3 rounded-2xl font-inter text-base border text-center',
		isBlue &&
			'bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white border-blue-500',
		isGhost &&
			'hover:bg-white/15 active:bg-white/25 text-white border-white/30',
		isWhite &&
			'border border-gray-300 bg-white text-blue-600 hover:bg-gray-200 active:bg-gray-100',
		isActive &&
			(isBlue
				? 'bg-blue-600!'
				: isGhost
					? 'bg-white/25'
					: isWhite
						? 'border-blue-500!'
						: ''),
		className,
	);

	if (href) {
		const { target, rel } = props as AsLink;
		return (
			<Link href={href} target={target} rel={rel} className={baseClasses}>
				{children}
			</Link>
		);
	}

	return (
		<button className={baseClasses} {...(props as AsButton)}>
			{children}
		</button>
	);
};
