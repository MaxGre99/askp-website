import { JSX } from 'react';

import { FullUser, UserWithCreatedAt } from '@/entities/users';

interface UsersTableRowProps {
	user: UserWithCreatedAt | FullUser;
	actions: JSX.Element;
}

export const UsersTableRow = ({ user, actions }: UsersTableRowProps) => (
	<tr className='hover:bg-gray-50 transition-colors'>
		<td className='px-4 py-3 font-medium text-gray-900'>{user.email}</td>
		<td className='px-4 py-3'>{user.firstName}</td>
		<td className='px-4 py-3'>{user.lastName}</td>
		<td className='px-4 py-3 text-gray-500'>
			{new Date(user.createdAt).toLocaleDateString()}
		</td>
		{'role' in user && <td className='px-4 py-3 text-gray-500'>{user.role}</td>}
		{'status' in user && (
			<td className='px-4 py-3 text-gray-500'>{user.status}</td>
		)}
		<td className='px-4 py-3'>{actions}</td>
	</tr>
);
