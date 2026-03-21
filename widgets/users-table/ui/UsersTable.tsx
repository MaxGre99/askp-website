import { useTranslation } from 'react-i18next';

import { FullUser, UserWithCreatedAt } from '@/entities/users';

type Props = {
	data?: UserWithCreatedAt[] | FullUser[];
	loading?: boolean;
	emptyText: string;
	renderRow: (item: UserWithCreatedAt | FullUser) => React.ReactNode;
};

export const UsersTable = ({ data, loading, emptyText, renderRow }: Props) => {
	const { t } = useTranslation();

	if (loading) {
		return (
			<div className='flex flex-1 w-full items-center justify-center rounded-2xl border text-gray-500 animate-pulse'>
				{t('notifications.loading')}
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className='flex flex-1 w-full items-center justify-center rounded-2xl border text-gray-700 text-2xl'>
				{emptyText}
			</div>
		);
	}

	return (
		<div className='rounded-2xl border overflow-auto'>
			<table className='w-full text-sm'>
				<thead className='bg-gray-50 text-gray-600'>
					<tr>
						<th className='text-left px-4 py-3'>{t('labels.email')}</th>
						<th className='text-left px-4 py-3'>{t('labels.firstName')}</th>
						<th className='text-left px-4 py-3'>{t('labels.lastName')}</th>
						<th className='text-left px-4 py-3'>{t('labels.date')}</th>
						{'role' in data[0] && (
							<th className='text-left px-4 py-3'>{t('labels.role')}</th>
						)}
						{'status' in data[0] && (
							<th className='text-left px-4 py-3'>{t('labels.status')}</th>
						)}
						<th className='text-left px-4 py-3'>{t('labels.actions')}</th>
					</tr>
				</thead>

				<tbody className='divide-y'>{data.map(renderRow)}</tbody>
			</table>
		</div>
	);
};
