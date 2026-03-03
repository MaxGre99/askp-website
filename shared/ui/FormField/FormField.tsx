import { ErrorMessage, Field, useFormikContext } from 'formik';

interface FormFieldProps<Values extends object = object> {
	name: keyof Values;
	label?: string;
	type?: string;
	as?: 'input' | 'textarea';
	placeholder?: string;
	required?: boolean;
	className?: string;
}

export const FormField = <Values extends object>({
	name,
	label,
	type = 'text',
	as = 'input',
	placeholder,
	required,
	className,
}: FormFieldProps<Values>) => {
	const { errors, touched, values, setFieldValue } = useFormikContext<Values>();

	const hasError = touched[name] && errors[name];
	const fieldValue = values[name];

	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			{label && (
				<label className='text-sm font-medium text-gray-700'>
					{label}
					{required && <span className='text-red-500'>*</span>}
				</label>
			)}

			{type === 'date' ? (
				// Для date используем обычный input с обработкой
				<input
					type='date'
					name={name as string}
					value={(fieldValue as string) || ''}
					onChange={(e) => setFieldValue(name as string, e.target.value)}
					className={`input ${hasError ? 'ring-2 ring-red-400' : ''}`}
					placeholder={placeholder}
				/>
			) : (
				<Field
					name={name}
					type={type}
					as={as}
					placeholder={placeholder}
					className={`input ${hasError ? 'ring-2 ring-red-400' : ''} ${className}`}
				/>
			)}

			<ErrorMessage name={name as string} component='p' className='error' />
		</div>
	);
};
