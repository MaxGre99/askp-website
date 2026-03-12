import { FaCalendarDay } from 'react-icons/fa';
import { FaNewspaper, FaUser, FaUserClock } from 'react-icons/fa6';
import { PiArticleMediumBold } from 'react-icons/pi';

export const accountSidebarItems = [
	{
		title: 'profile',
		icon: FaUser,
		access: ['OWNER', 'ADMIN', 'USER'],
	},
	{
		title: 'news',
		icon: FaNewspaper,
		access: ['OWNER', 'ADMIN'],
	},
	{
		title: 'events',
		icon: FaCalendarDay,
		access: ['OWNER', 'ADMIN'],
	},
	{
		title: 'articles',
		icon: PiArticleMediumBold,
		access: ['OWNER', 'ADMIN'],
	},
	{
		title: 'applications',
		icon: FaUserClock,
		access: ['OWNER', 'ADMIN'],
	},
];
