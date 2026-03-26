'use client';

import {
	CreateProductForm,
	// ProductFormFields,
	// useCreateProductForm,
} from '@/features/product-form';
import { useAccountGuard } from '@/shared/hooks/useAccountGuard';

export const AddProductPage = () => {
	// const { initialValues, schema, handleSubmit } = useCreateProductForm();

	const { isForbidden, isUnauthorized, isLoading } = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoading || isForbidden || isUnauthorized) return null;

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
