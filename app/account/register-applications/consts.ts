import {
	RiUserFollowFill,
	RiUserUnfollowFill,
	RiUserForbidFill,
	RiUserReceived2Fill,
} from 'react-icons/ri';
import { IconType } from 'react-icons';
import { ApplicationAction } from '@/shared/api/types/applicationAction';

export type ApplicationConfig = {
	title: ApplicationAction;
	icon: IconType;
	color: string;
};

export const APPLICATION_ACTIONS: Record<ApplicationAction, ApplicationConfig> =
	{
		approve: {
			title: 'approve',
			icon: RiUserFollowFill,
			color: 'bg-emerald-500 hover:bg-emerald-600',
		},
		reject: {
			title: 'reject',
			icon: RiUserUnfollowFill,
			color: 'bg-gray-500 hover:bg-gray-600',
		},
		block: {
			title: 'block',
			icon: RiUserForbidFill,
			color: 'bg-red-500 hover:bg-red-600',
		},
		unblock: {
			title: 'unblock',
			icon: RiUserReceived2Fill,
			color: 'bg-blue-500 hover:bg-blue-600',
		},
	};
