import { JSX } from 'react';

import { useTranslation } from 'react-i18next';

import { FullUser, UserWithCreatedAt } from '@/entities/users';

import {
	USER_ROLE_STYLES,
	USER_STATUS_STYLES,
	UserRole,
	UserStatus,
} from '../model/styles-config';

interface UsersTableRowProps {
	user: UserWithCreatedAt | FullUser;
	actions: JSX.Element;
}

export const UsersTableRow = ({ user, actions }: UsersTableRowProps) => {
	const { t } = useTranslation();
	return (
		<tr className='hover:bg-gray-50 transition-colors'>
			<td className='px-4 py-3 font-medium text-gray-900'>{user.email}</td>
			<td className='px-4 py-3'>{user.firstName}</td>
			<td className='px-4 py-3'>{user.lastName}</td>
			<td className='px-4 py-3 text-gray-500'>
				{new Date(user.createdAt).toLocaleDateString()}
			</td>
			{'role' in user && (
				<td className='px-4 py-3'>
					<span
						className={`px-2.5 py-1 rounded-full text-sm font-medium ${USER_ROLE_STYLES[user.role as UserRole]}`}
					>
						{t(`labels.${user.role}`)}
					</span>
				</td>
			)}
			{'status' in user && (
				<td className='px-4 py-3'>
					<span
						className={`px-2.5 py-1 rounded-full text-sm font-medium text-nowrap  ${USER_STATUS_STYLES[user.status as UserStatus]}`}
					>
						{t(`labels.${user.status}`)}
					</span>
				</td>
			)}
			<td className='px-4 py-3'>{actions}</td>
		</tr>
	);
};
