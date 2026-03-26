'use client';

import { EditProductForm } from '@/features/product-form';
import { useAccountGuard } from '@/shared/hooks/useAccountGuard';

// import { ProductFormFields } from '@/features/product-form';
// import { useEditProductForm } from '@/features/product-form/model/useEditProductForm';

export const EditProductPage = () => {
	// const { initialValues, schema, handleSubmit, isLoading } =
	// 	useEditProductForm();
	// if (isLoading) return <div>Загрузка...</div>;

	const { isForbidden, isUnauthorized, isLoading } = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoading || isForbidden || isUnauthorized) return null;

	return (
		<div className='flex flex-col gap-2 items-center justify-center w-2xl bg-white rounded-2xl p-6'>
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
