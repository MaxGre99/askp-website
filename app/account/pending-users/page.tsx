'use client';

import { useTranslation } from 'react-i18next';

import { useGetPendingUsersQuery } from '@/entities/users';
import { Loader } from '@/shared/ui/Loader';
import { AdminUsersTable, getActionsForUser } from '@/widgets/users-table';

const Page = () => {
	const { data, isLoading } = useGetPendingUsersQuery();
	const { t } = useTranslation();

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

export default Page;
