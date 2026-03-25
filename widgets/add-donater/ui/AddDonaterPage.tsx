'use client';

import {
	DonaterFormFields,
	useCreateDonaterForm,
} from '@/features/donater-form';
import { useAccountGuard } from '@/shared/hooks/useAccountGuard';

export const AddDonaterPage = () => {
	const { initialValues, schema, handleSubmit } = useCreateDonaterForm();
	const { isForbidden, isUnauthorized, isLoading } = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoading || isForbidden || isUnauthorized) return null;

	return (
		<div className='flex flex-col gap-2 items-center justify-center w-2xl bg-white rounded-2xl p-6'>
			<DonaterFormFields
				title='Добавить мецената'
				initialValues={initialValues}
				schema={schema}
				handleSubmit={handleSubmit}
				submitLabel='Создать'
			/>
		</div>
	);
};
