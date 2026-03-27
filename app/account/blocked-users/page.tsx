'use client';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useGetBlockedUsersQuery } from '@/entities/users';
import { handleApiError } from '@/shared/lib/handleApiError';
import { Loader } from '@/shared/ui/Loader';
import { AdminUsersTable } from '@/widgets/users-table';

const Page = () => {
	const { data, isLoading, isError, error } = useGetBlockedUsersQuery();
	const { t } = useTranslation();

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	if (isLoading) return <Loader />;

	return (
		<AdminUsersTable
			data={data}
			loading={isLoading}
			emptyText={t('account.applications.blocked.empty')}
			getActions={() => ['unblock']}
		/>
	);
};

export default Page;
