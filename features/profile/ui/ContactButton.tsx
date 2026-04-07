import clsx from 'clsx';
import { IconType } from 'react-icons';

interface Props {
	icon: IconType;
	label: string;
	href: string;
	action: 'tel' | 'href';
	className?: string;
}

export const ContactButton = ({
	icon: Icon,
	label,
	href,
	action,
	className,
}: Props) => {
	const baseClasses =
		'flex items-center gap-2 bg-blue-500 text-white px-4 p-3 rounded-2xl hover:bg-blue-600 active:bg-blue-400';

	return (
		<a
			href={href}
			{...(action === 'href'
				? { target: '_blank', rel: 'noopener noreferrer' }
				: {})}
			className={clsx(baseClasses, className)}
		>
			<Icon size={18} />
			<span className='text-sm'>{label}</span>
		</a>
	);
};
