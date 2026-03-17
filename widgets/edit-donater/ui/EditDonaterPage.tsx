'use client';

import { DonaterFormFields, useEditDonaterForm } from '@/features/donater-form';
import { useAccountGuard } from '@/shared/routing/useAccountGuard';

export const EditDonaterPage = () => {
	const { initialValues, schema, handleSubmit, isLoading } =
		useEditDonaterForm();

	const {
		isForbidden,
		isUnauthorized,
		isLoading: isLoadingUser,
	} = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoadingUser || isForbidden || isUnauthorized) return null;

	if (isLoading) return <div>Загрузка...</div>;

	return (
		<div className='flex flex-col gap-2 items-center justify-center w-2xl bg-white rounded-2xl p-6'>
			<DonaterFormFields
				title='Редактировать мецената'
				initialValues={initialValues}
				schema={schema}
				handleSubmit={handleSubmit}
				submitLabel='Сохранить'
				enableReinitialize
			/>
		</div>
	);
};
