import { Field, ErrorMessage, useFormikContext } from 'formik';

interface FormFieldProps<Values extends object = object> {
	name: keyof Values;
	label: string;
	type?: string;
	placeholder?: string;
	as?: 'input' | 'textarea';
	required?: boolean;
	highlightOnError?: string;
}

const FormField = <Values extends object = object>({
	name,
	label,
	type = 'text',
	placeholder,
	as = 'input',
	required,
	highlightOnError,
}: FormFieldProps<Values>) => {
	const { errors, touched, submitCount } = useFormikContext<Values>();

	const hasFieldError = touched[name] && errors[name];
	const hasExtraError =
		highlightOnError &&
		submitCount > 0 &&
		errors[highlightOnError as keyof Values];

	return (
		<div className='flex flex-col gap-1'>
			<label className='text-md text-black ml-1'>
				{label}
				{required && <span className='text-red-500'>*</span>}
			</label>

			<Field
				as={as}
				name={name}
				type={type}
				placeholder={placeholder}
				className={`input ${
					hasFieldError || hasExtraError ? 'ring-2 ring-red-400' : ''
				}`}
			/>

			<ErrorMessage name={name as string} component='p' className='error' />
		</div>
	);
};

export default FormField;
