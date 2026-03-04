import { useField } from 'formik';
import Select, { MultiValue, SingleValue } from 'react-select';

export const FormikSelect = ({
	name,
	options,
	isMulti = false,
	placeholder,
	label,
}: {
	name: string;
	options: { value: string; label: string }[];
	isMulti?: boolean;
	placeholder?: string;
	label: string;
}) => {
	const [field, meta, helpers] = useField(name);

	return (
		<div className='flex flex-col gap-1'>
			<label className='font-bold'>{label}</label>
			<Select
				options={options}
				value={
					isMulti
						? options.filter((opt) => field.value?.includes(opt.value))
						: options.find((opt) => opt.value === field.value) || null
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onChange={(selected: SingleValue<any> | MultiValue<any>) => {
					if (isMulti) {
						// ← здесь точно массив
						helpers.setValue(
							Array.isArray(selected) ? selected.map((o) => o.value) : [],
						);
					} else {
						// ← здесь одиночный объект
						helpers.setValue(
							selected ? (selected as { value: string }).value : null,
						);
					}
				}}
				placeholder={placeholder}
				isMulti={isMulti}
			/>
			{meta.touched && meta.error && (
				<p className='text-red-500 text-sm'>{meta.error}</p>
			)}
		</div>
	);
};
