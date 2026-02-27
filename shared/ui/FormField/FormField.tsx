import { Field, ErrorMessage, useFormikContext } from 'formik';

interface FormFieldProps<Values extends object = object> {
	name: keyof Values;
	label: string;
	type?: string;
	as?: 'input' | 'textarea';
	placeholder?: string;
	required?: boolean;
}

export const FormField = <Values extends object>({
	name,
	label,
	type = 'text',
	as = 'input',
	placeholder,
	required,
}: FormFieldProps<Values>) => {
	const { errors, touched } = useFormikContext<Values>();

	const hasError = touched[name] && errors[name];

	return (
		<div className='flex flex-col gap-1'>
			<label className='text-sm font-medium text-gray-700'>
				{label}
				{required && <span className='text-red-500'>*</span>}
			</label>

			<Field
				name={name}
				type={type}
				as={as}
				placeholder={placeholder}
				className={`input ${hasError ? 'ring-2 ring-red-400' : ''}`}
			/>

			<ErrorMessage name={name as string} component='p' className='error' />
		</div>
	);
};
