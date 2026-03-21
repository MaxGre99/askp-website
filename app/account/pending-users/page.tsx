'use client';

import { useTranslation } from 'react-i18next';

import { useGetPendingUsersQuery } from '@/entities/users';
import { AdminUsersTable } from '@/widgets/users-table';

const Page = () => {
	const { data, isLoading } = useGetPendingUsersQuery();
	const { t } = useTranslation();
	return (
		<AdminUsersTable
			data={data}
			loading={isLoading}
			emptyText={t('account.applications.pending.empty')}
			actions={['approve', 'reject', 'block', 'setAdmin']}
		/>
	);
};

export default Page;
