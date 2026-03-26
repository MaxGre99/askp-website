'use client';

import { useTranslation } from 'react-i18next';

import { useGetBlockedUsersQuery } from '@/entities/users';
import { Loader } from '@/shared/ui/Loader';
import { AdminUsersTable } from '@/widgets/users-table';

const Page = () => {
	const { data, isLoading } = useGetBlockedUsersQuery();
	const { t } = useTranslation();

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
