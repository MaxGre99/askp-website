'use client';

import { useTranslation } from 'react-i18next';

import {
	ApplicationsTableRow,
	useGetBlockedApplicationsQuery,
	useGetPendingApplicationsQuery,
} from '@/entities/applications';
import {
	BlockedApplicationActions,
	PendingApplicationActions,
} from '@/features/manage-application-status';
import { ApplicationsTable } from '@/widgets/applications-table';

const Page = () => {
	const { t } = useTranslation();
	const { data: pendingApplications, isLoading: loadingPendingApplications } =
		useGetPendingApplicationsQuery();
	const { data: blockedApplications, isLoading: loadingBlockedApplications } =
		useGetBlockedApplicationsQuery();

	return (
		<div className='max-w-full'>
			<h1 className='text-xl font-semibold mb-4'>
				{t('account.applications.pending.title')}
			</h1>
			<div className='w-full space-y-8'>
				<ApplicationsTable
					data={pendingApplications}
					loading={loadingPendingApplications}
					emptyText={t('account.applications.pending.empty')}
					renderRow={(u) => (
						<ApplicationsTableRow
							key={u.id}
							user={u}
							actions={<PendingApplicationActions id={u.id} />}
						/>
					)}
				/>

				<h1 className='text-xl font-semibold mb-4'>
					{t('account.applications.blocked.title')}
				</h1>
				<ApplicationsTable
					data={blockedApplications}
					loading={loadingBlockedApplications}
					emptyText={t('account.applications.blocked.empty')}
					renderRow={(u) => (
						<ApplicationsTableRow
							key={u.id}
							user={u}
							actions={<BlockedApplicationActions id={u.id} />}
						/>
					)}
				/>
			</div>
		</div>
		// </div>
	);
};

export default Page;
