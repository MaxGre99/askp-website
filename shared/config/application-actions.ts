import {
	RiUserFollowFill,
	RiUserUnfollowFill,
	RiUserForbidFill,
	RiUserReceived2Fill,
} from 'react-icons/ri';
import { IconType } from 'react-icons';

export type ApplicationAction = 'approve' | 'reject' | 'block' | 'unblock';

export const APPLICATION_ACTIONS: Record<
	ApplicationAction,
	{ icon: IconType; color: string }
> = {
	approve: {
		icon: RiUserFollowFill,
		color: 'bg-emerald-500 hover:bg-emerald-600',
	},
	reject: { icon: RiUserUnfollowFill, color: 'bg-gray-500 hover:bg-gray-600' },
	block: { icon: RiUserForbidFill, color: 'bg-red-500 hover:bg-red-600' },
	unblock: {
		icon: RiUserReceived2Fill,
		color: 'bg-blue-500 hover:bg-blue-600',
	},
};
