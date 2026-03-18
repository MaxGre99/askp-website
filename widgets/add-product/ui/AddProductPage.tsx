'use client';

import {
	CreateProductForm,
	// ProductFormFields,
	// useCreateProductForm,
} from '@/features/product-form';

export const AddProductPage = () => {
	// const { initialValues, schema, handleSubmit } = useCreateProductForm();
	return (
		<div className='flex flex-col gap-2 items-center justify-center w-2xl bg-white rounded-2xl p-6'>
			{/* <ProductFormFields
				title='Добавить товар'
				initialValues={initialValues}
				schema={schema}
				handleSubmit={handleSubmit}
				submitLabel='Создать'
			/> */}
			<CreateProductForm />
		</div>
	);
};
