import { JSX } from 'react';

interface ApplicationsTableRowProps {
	user: {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
		createdAt: string;
	};
	actions: JSX.Element;
}

export const ApplicationsTableRow = ({
	user,
	actions,
}: ApplicationsTableRowProps) => (
	<tr className='hover:bg-gray-50 transition-colors'>
		<td className='px-4 py-3 font-medium text-gray-900'>{user.email}</td>
		<td className='px-4 py-3'>{user.firstName}</td>
		<td className='px-4 py-3'>{user.lastName}</td>
		<td className='px-4 py-3 text-gray-500'>
			{new Date(user.createdAt).toLocaleDateString()}
		</td>
		<td className='px-4 py-3'>{actions}</td>
	</tr>
);
