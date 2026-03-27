'use client';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useGetAllUsersQuery } from '@/entities/users';
import { handleApiError } from '@/shared/lib/handleApiError';
import { Loader } from '@/shared/ui/Loader';
import { AdminUsersTable, getActionsForUser } from '@/widgets/users-table';

const Page = () => {
	const { data, isLoading, isError, error } = useGetAllUsersQuery();
	const { t } = useTranslation();

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	if (isLoading) return <Loader />;

	return (
		<AdminUsersTable
			data={data}
			loading={isLoading}
			emptyText={t('account.users.empty')}
			getActions={getActionsForUser}
		/>
	);
};

export default Page;
