import { IconType } from 'react-icons';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
	RiUserFollowFill,
	RiUserForbidFill,
	RiUserMinusFill,
	RiUserReceived2Fill,
	RiUserStarFill,
	RiUserUnfollowFill,
} from 'react-icons/ri';

export type UserAction =
	| 'approve'
	| 'reject'
	| 'block'
	| 'unblock'
	| 'setAdmin'
	| 'setUser'
	| 'deleteUser';

export const USER_ACTIONS: Record<
	UserAction,
	{ icon: IconType; color: string }
> = {
	approve: {
		icon: RiUserFollowFill,
		color: 'bg-emerald-500 hover:bg-emerald-600',
	},
	reject: {
		icon: RiUserUnfollowFill,
		color: 'bg-gray-500 hover:bg-gray-600',
	},
	block: { icon: RiUserForbidFill, color: 'bg-red-500 hover:bg-red-600' },
	unblock: {
		icon: RiUserReceived2Fill,
		color: 'bg-blue-500 hover:bg-blue-600',
	},
	setAdmin: {
		icon: RiUserStarFill,
		color: 'bg-fuchsia-500 hover:bg-fuchsia-600',
	},
	setUser: {
		icon: RiUserMinusFill,
		color:
			'bg-transparent! text-blue-500! border border-dashed! border-blue-500! hover:text-blue-600!',
	},
	deleteUser: {
		icon: FaRegTrashAlt,
		color: 'bg-black! hover:bg-gray-600!',
	},
};
