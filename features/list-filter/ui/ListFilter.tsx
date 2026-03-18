import { Button } from '@/shared/ui/Button';

type Props = {
	value: string;
	onChange: (v: string) => void;
	onSubmit: () => void;
	placeholder: string;
	buttonText: string;

	pageSize: number;
	onPageSizeChange: (size: number) => void;
};

export const ListFilter = ({
	value,
	onChange,
	onSubmit,
	placeholder,
	buttonText,
	pageSize,
	onPageSizeChange,
}: Props) => {
	return (
		<div className='flex gap-4 items-center max-w-xl w-full'>
			<div className='flex gap-2 flex-1'>
				<input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className='input flex-1'
				/>
				<Button onClick={onSubmit}>{buttonText}</Button>
			</div>

			<select
				value={pageSize}
				onChange={(e) => onPageSizeChange(Number(e.target.value))}
				className='input w-24'
			>
				<option value={4}>4</option>
				<option value={8}>8</option>
				<option value={12}>12</option>
			</select>
		</div>
	);
};
