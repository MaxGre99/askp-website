import dynamic from 'next/dynamic';

import { useField } from 'formik';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export const FormikQuillField = ({
	name,
	label,
}: {
	name: string;
	label: string;
}) => {
	const [field, meta, helpers] = useField(name);

	return (
		<div>
			<label className='font-bold'>{label}</label>
			<ReactQuill
				theme='snow'
				value={field.value || ''}
				onChange={(value) => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				className='mt-2'
				readOnly={false}
				modules={{
					toolbar: [
						[{ header: [1, 2, 3, false] }],
						['bold', 'italic', 'underline', 'strike'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['link'],
						['clean'],
					],
				}}
			/>
			{meta.touched && meta.error && (
				<p className='text-red-500 text-sm'>{meta.error}</p>
			)}
		</div>
	);
};
