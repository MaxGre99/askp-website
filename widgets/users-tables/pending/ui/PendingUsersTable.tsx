'use client';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useGetPendingUsersQuery } from '@/entities/users';
import { AdminUsersTable, getActionsForUser } from '@/features/users-table';
import { handleApiError } from '@/shared/lib/helpers';
import { Loader } from '@/shared/ui/Loader';

export const PendingUsersTable = () => {
	const { data, isLoading, isError, error } = useGetPendingUsersQuery();
	const { t } = useTranslation();

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	if (isLoading) return <Loader />;

	return (
		<AdminUsersTable
			data={data}
			loading={isLoading}
			emptyText={t('account.applications.pending.empty')}
			getActions={getActionsForUser}
		/>
	);
};
