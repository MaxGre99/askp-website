'use client';

import { EditProductForm } from '@/features/product-form';

// import { ProductFormFields } from '@/features/product-form';
// import { useEditProductForm } from '@/features/product-form/model/useEditProductForm';

export const EditProductPage = () => {
	// const { initialValues, schema, handleSubmit, isLoading } =
	// 	useEditProductForm();
	// if (isLoading) return <div>Загрузка...</div>;
	return (
		<div className='p-6'>
			{/* <ProductFormFields
				title='Редактировать товар'
				initialValues={initialValues}
				schema={schema}
				handleSubmit={handleSubmit}
				submitLabel='Сохранить'
				enableReinitialize
			/> */}
			<EditProductForm />
		</div>
	);
};
