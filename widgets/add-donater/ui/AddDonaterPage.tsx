'use client';

import { useTranslation } from 'react-i18next';

import {
	DonaterFormFields,
	useCreateDonaterForm,
} from '@/features/donater-form';
import { useAccountGuard } from '@/shared/hooks/useAccountGuard';
import { Loader } from '@/shared/ui/Loader';

export const AddDonaterPage = () => {
	const { t } = useTranslation();

	const { initialValues, schema, handleSubmit } = useCreateDonaterForm();

	const { isForbidden, isUnauthorized, isLoading } = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoading || isForbidden || isUnauthorized) return <Loader />;

	return (
		<div className='flex flex-col gap-2 items-center justify-center w-2xl bg-white rounded-2xl p-6'>
			<DonaterFormFields
				title={t('buttons.addDonater')}
				initialValues={initialValues}
				schema={schema}
				handleSubmit={handleSubmit}
				submitLabel={t('buttons.add')}
			/>
		</div>
	);
};
