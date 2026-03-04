import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
}

export const TransparentButton = ({
	className,
	children,
	isActive,
	...props
}: ButtonProps) => {
	const baseClasses =
		'flex items-center justify-center hover:bg-white/15 hover:cursor-pointer active:bg-white/20 transition-all duration-200 text-2xl text-white mx-auto font-oswald w-full h-[140px] p-3 rounded-2xl';

	return (
		<button
			className={clsx(
				isActive ? 'bg-white/25 ring-1 ring-white/40' : '',
				baseClasses,
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
