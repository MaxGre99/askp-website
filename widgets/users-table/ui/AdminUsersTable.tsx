import { FullUser, UserWithCreatedAt } from '@/entities/users';

import { UserAction } from '../model/actions-config';

import { UsersActions } from './UsersActions';
import { UsersTable } from './UsersTable';
import { UsersTableRow } from './UsersTableRow';

interface Props {
	data?: UserWithCreatedAt[] | FullUser[];
	loading: boolean;
	emptyText: string;
	actions: UserAction[];
}

export const AdminUsersTable = ({
	data,
	loading,
	emptyText,
	actions,
}: Props) => {
	return (
		<UsersTable
			data={data}
			loading={loading}
			emptyText={emptyText}
			renderRow={(u) => (
				<UsersTableRow
					key={u.id}
					user={u}
					actions={<UsersActions id={u.id} types={actions} />}
				/>
			)}
		/>
	);
};
