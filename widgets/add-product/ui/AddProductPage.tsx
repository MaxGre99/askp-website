'use client';

import { useTranslation } from 'react-i18next';

import { CreateProductForm } from '@/features/product-form';
import { useAccountGuard } from '@/shared/hooks/useAccountGuard';
import { Loader } from '@/shared/ui/Loader';

export const AddProductPage = () => {
	const { t } = useTranslation();

	const { isForbidden, isUnauthorized, isLoading } = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoading || isForbidden || isUnauthorized) return <Loader />;

	return (
		<div className='flex flex-col gap-6 items-center justify-center w-2xl bg-white rounded-2xl p-6'>
			<h1 className='text-2xl font-bold'>{t('buttons.addProduct')}</h1>
			<CreateProductForm />
		</div>
	);
};
