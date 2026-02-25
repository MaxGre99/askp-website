import { useTranslation } from 'react-i18next';

type Props<T> = {
	data?: T[];
	loading?: boolean;
	emptyText: string;
	renderRow: (item: T) => React.ReactNode;
};

export function ApplicationsTable<T>({
	data,
	loading,
	emptyText,
	renderRow,
}: Props<T>) {
	const { t } = useTranslation();

	if (loading) {
		return (
			<div className='rounded-2xl border p-6 text-gray-500 animate-pulse'>
				{t('notifications.loading')}
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className='rounded-2xl border p-6 text-gray-400'>{emptyText}</div>
		);
	}

	return (
		<div className='rounded-2xl border overflow-auto max-w-full'>
			<table className='w-full text-sm'>
				<thead className='bg-gray-50 text-gray-600'>
					<tr>
						<th className='text-left px-4 py-3'>{t('labels.email')}</th>
						<th className='text-left px-4 py-3'>{t('labels.firstName')}</th>
						<th className='text-left px-4 py-3'>{t('labels.lastName')}</th>
						<th className='text-left px-4 py-3'>{t('labels.date')}</th>
						<th className='text-left px-4 py-3'>{t('labels.actions')}</th>
					</tr>
				</thead>

				<tbody className='divide-y'>{data.map(renderRow)}</tbody>
			</table>
		</div>
	);
}
