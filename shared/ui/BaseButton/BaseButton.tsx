import clsx from 'clsx';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
// 	isActive?: boolean;
// }

export const BaseButton = ({
	className,
	children,
	// isActive,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	const baseClasses =
		'flex items-center justify-center bg-blue-500 text-white p-3 rounded-2xl hover:bg-blue-600 active:bg-blue-400 disabled:opacity-50';

	return (
		<button
			className={clsx(
				// isActive ? 'bg-white/25 ring-1 ring-white/40' : '',
				baseClasses,
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
