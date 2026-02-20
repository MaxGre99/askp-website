'use client';

import {
	useApproveUserMutation,
	useGetPendingUsersQuery,
	useRejectUserMutation,
} from '@/shared/api/applicationsApi';
import { useTranslation } from 'react-i18next';

const Page = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useGetPendingUsersQuery();
	const [approveUser] = useApproveUserMutation();
	const [rejectUser] = useRejectUserMutation();

	return (
		<div className='p-6 w-full'>
			<h1 className='text-xl font-semibold mb-4'>
				{t('sidebar.registerApplications')}
			</h1>

			{isLoading && <p>{t('notifications.loading')}</p>}

			{!isLoading && (!data || data.length === 0) && (
				<p className='text-gray-500'>
					{t('account.registerApplications.noApplications')}
				</p>
			)}

			{data && data.length > 0 && (
				<table className='w-full border'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-2 py-1'>{t('labels.email')}</th>
							<th className='border px-2 py-1'>{t('labels.firstName')}</th>
							<th className='border px-2 py-1'>{t('labels.lastName')}</th>
							<th className='border px-2 py-1'>{t('labels.date')}</th>
							<th className='border px-2 py-1'>{t('labels.actions')}</th>
						</tr>
					</thead>
					<tbody>
						{data.map((u) => (
							<tr key={u.id}>
								<td className='border px-2 py-1'>{u.email}</td>
								<td className='border px-2 py-1'>{u.firstName}</td>
								<td className='border px-2 py-1'>{u.lastName}</td>
								<td className='border px-2 py-1'>
									{new Date(u.createdAt).toLocaleDateString()}
								</td>
								<td className='border px-2 py-1 flex gap-2'>
									<button
										onClick={() => approveUser(u.id)}
										className='bg-green-500 text-white px-2 py-1 rounded'
									>
										{t('buttons.approve')}
									</button>
									<button
										onClick={() => rejectUser(u.id)}
										className='bg-red-500 text-white px-2 py-1 rounded'
									>
										{t('buttons.reject')}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
		// </div>
	);
};

export default Page;
