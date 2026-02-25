'use client';

import { useTranslation } from 'react-i18next';
import { ApplicationsTable } from '@/widgets/applications-table/ui/applications-table/applications-table';
import { ApplicationsTableRow } from '@/entities/application/ui/applications-table-row/applications-table-row';
import { BlockedApplicationActions } from '@/features/manage-application-status/ui/blocked-application-actions';
import { PendingApplicationActions } from '@/features/manage-application-status/ui/pending-application-actions';
import {
	useGetBlockedApplicationsQuery,
	useGetPendingApplicationsQuery,
} from '@/entities/application/api/applicationsApi';

const Page = () => {
	const { t } = useTranslation();
	const { data: pendingApplications, isLoading: loadingPendingApplications } =
		useGetPendingApplicationsQuery();
	const { data: blockedApplications, isLoading: loadingBlockedApplications } =
		useGetBlockedApplicationsQuery();

	return (
		<div className='max-w-full'>
			<h1 className='text-xl font-semibold mb-4'>
				{t('account.registerApplications.pending.title')}
			</h1>
			<div className='w-full space-y-8'>
				<ApplicationsTable
					data={pendingApplications}
					loading={loadingPendingApplications}
					emptyText={t('account.registerApplications.pending.empty')}
					renderRow={(u) => (
						<ApplicationsTableRow
							key={u.id}
							user={u}
							actions={<PendingApplicationActions id={u.id} />}
						/>
					)}
				/>

				<h1 className='text-xl font-semibold mb-4'>
					{t('account.registerApplications.blocked.title')}
				</h1>
				<ApplicationsTable
					data={blockedApplications}
					loading={loadingBlockedApplications}
					emptyText={t('account.registerApplications.blocked.empty')}
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
