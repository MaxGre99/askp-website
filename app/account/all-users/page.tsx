'use client';

import { useTranslation } from 'react-i18next';

import { useGetAllUsersQuery } from '@/entities/users';
import { AdminUsersTable } from '@/widgets/users-table';

const Page = () => {
	const { data, isLoading } = useGetAllUsersQuery();
	const { t } = useTranslation();

	return (
		<AdminUsersTable
			data={data}
			loading={isLoading}
			emptyText={t('account.users.empty')}
			actions={['approve', 'reject', 'block', 'unblock', 'setAdmin']}
		/>
	);
};

export default Page;
