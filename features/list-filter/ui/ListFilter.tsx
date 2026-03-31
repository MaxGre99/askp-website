import { usePathname } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import Select, { SingleValue } from 'react-select';

import { reactSelectStyles } from '@/shared/lib/reactSelectStyles';
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
	const { t } = useTranslation();

	const pathname = usePathname();
	const isAccountPage = pathname.includes('/account/');

	return (
		<div className='flex gap-4 items-center max-w-xl w-full'>
			<div className='flex gap-2 flex-1'>
				<input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className='input flex-1'
				/>
				<Button variant={isAccountPage ? 'blue' : 'white'} onClick={onSubmit}>
					<FaSearch />
					{buttonText}
				</Button>
			</div>

			<Select
				options={[
					{ label: `4 ${t('labels.perPage')}`, value: '4' },
					{ label: `8 ${t('labels.perPage')}`, value: '8' },
					{ label: `12 ${t('labels.perPage')}`, value: '12' },
				]}
				value={{
					label: `${String(pageSize)} ${t('labels.perPage')}`,
					value: String(pageSize),
				}}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onChange={(option: SingleValue<any>) => {
					if (option) onPageSizeChange(Number(option.value));
				}}
				styles={reactSelectStyles}
			/>
		</div>
	);
};
