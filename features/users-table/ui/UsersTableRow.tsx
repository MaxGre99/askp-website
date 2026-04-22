import { JSX } from 'react';

import { useTranslation } from 'react-i18next';
import Select, { SingleValue } from 'react-select';

import {
	FullUser,
	UserWithCreatedAt,
	useSetUserMembershipLevelMutation,
} from '@/entities/users';
import { getReactSelectStyles, handleApiError } from '@/shared/lib/helpers';

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

type Option = { value: string; label: string };

export const UsersTableRow = ({ user, actions }: UsersTableRowProps) => {
	const { t } = useTranslation();

	const [setUserMembershipLevel] = useSetUserMembershipLevelMutation();

	const membershipOptions = [
		{ value: 'PRESIDENT', label: t('labels.PRESIDENT') },
		{ value: 'VICE_PRESIDENT', label: t('labels.VICE_PRESIDENT') },
		{ value: 'EXPERT', label: t('labels.EXPERT') },
		{ value: 'SPECIALIST', label: t('labels.SPECIALIST') },
		{
			value: 'PSYCHOLOGIST_PRACTITIONER',
			label: t('labels.PSYCHOLOGIST_PRACTITIONER'),
		},
		{ value: 'BEGINNER_SPECIALIST', label: t('labels.BEGINNER_SPECIALIST') },
		{ value: 'PARTNER', label: t('labels.PARTNER') },
	];

	const handleMembershipLevelChange = async (option: SingleValue<Option>) => {
		if (option)
			try {
				await setUserMembershipLevel({ id: user.id, level: option.value });
			} catch (err) {
				handleApiError(err);
			}
	};

	return (
		<tr className='hover:bg-gray-50 transition-colors'>
			<td className='px-4 py-3 font-medium text-gray-900'>{user.email}</td>
			<td className='px-4 py-3'>{user.firstName}</td>
			<td className='px-4 py-3'>{user.lastName}</td>
			<td className='px-4 py-3 text-gray-500'>
				{new Date(user.createdAt).toLocaleDateString()}
			</td>
			<td className='px-4 py-3'>
				<Select
					options={membershipOptions}
					value={membershipOptions.find(
						(o) => o.value === user.membershipLevel,
					)}
					onChange={handleMembershipLevelChange}
					styles={getReactSelectStyles<Option>()}
					placeholder={t('labels.selectMembershipLevel')}
					isSearchable={false}
				/>
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
