'use client';

import { EditProductForm } from '@/features/product-form';
import { useAccountGuard } from '@/shared/hooks/useAccountGuard';
import { Loader } from '@/shared/ui/Loader';

export const EditProductPage = () => {
	const { isForbidden, isUnauthorized, isLoading } = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoading || isForbidden || isUnauthorized) return <Loader />;

	return (
		<div className='flex flex-col gap-2 items-center justify-center w-2xl bg-white rounded-2xl p-6'>
			<EditProductForm />
		</div>
	);
};
