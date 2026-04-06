'use client';

import { useTranslation } from 'react-i18next';

import { DonaterFormFields, useEditDonaterForm } from '@/features/donater-form';
import { useAccountGuard } from '@/shared/hooks/useAccountGuard';
import { Loader } from '@/shared/ui/Loader';

export const EditDonaterPage = () => {
	const { t } = useTranslation();

	const { initialValues, schema, handleSubmit, isLoading } =
		useEditDonaterForm();

	const {
		isForbidden,
		isUnauthorized,
		isLoading: isLoadingUser,
	} = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoadingUser || isLoading || isForbidden || isUnauthorized)
		return <Loader />;

	return (
		<div className='flex flex-col gap-2 items-center justify-center w-full md:max-w-2xl bg-white rounded-2xl p-6'>
			<DonaterFormFields
				title={t('buttons.editDonater')}
				initialValues={initialValues}
				schema={schema}
				handleSubmit={handleSubmit}
				submitLabel={t('buttons.saveChanges')}
				enableReinitialize
			/>
		</div>
	);
};
