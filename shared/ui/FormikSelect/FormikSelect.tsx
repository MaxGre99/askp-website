import { useField } from 'formik';
import Select, { MultiValue, SingleValue } from 'react-select';

import { getReactSelectStyles } from '@/shared/lib/helpers';

type Option = { value: string; label: string };

export const FormikSelect = ({
	name,
	label,
	options,
	placeholder,
	isMulti = false,
	menuPlacement = 'auto',
}: {
	name: string;
	label: string;
	options: { value: string; label: string }[];
	placeholder?: string;
	isMulti?: boolean;
	menuPlacement?: 'auto' | 'top' | 'bottom';
}) => {
	const [field, meta, helpers] = useField(name);

	const handleChange = (selected: SingleValue<Option> | MultiValue<Option>) => {
		if (isMulti) {
			helpers.setValue(
				Array.isArray(selected) ? selected.map((o) => o.value) : [],
			);
		} else {
			helpers.setValue(selected ? (selected as Option).value : null);
		}
	};

	const commonProps = {
		options,
		placeholder,
		onChange: handleChange,
	};

	return (
		<div className='flex flex-col gap-1'>
			<label className='font-bold'>{label}</label>
			{isMulti ? (
				<Select<Option, true>
					{...commonProps}
					isMulti
					value={options.filter((opt) => field.value?.includes(opt.value))}
					styles={getReactSelectStyles<Option, true>()}
					menuPlacement={menuPlacement}
				/>
			) : (
				<Select<Option, false>
					{...commonProps}
					value={options.find((opt) => opt.value === field.value) || null}
					styles={getReactSelectStyles<Option, false>()}
					menuPlacement={menuPlacement}
				/>
			)}
			{meta.touched && meta.error && (
				<p className='text-red-500 text-sm'>{meta.error}</p>
			)}
		</div>
	);
};
