import { FaNewspaper, FaUser, FaUserClock } from 'react-icons/fa6';
import { MdEventNote } from 'react-icons/md';

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
		icon: MdEventNote,
		access: ['OWNER', 'ADMIN'],
	},
	{
		title: 'applications',
		icon: FaUserClock,
		access: ['OWNER', 'ADMIN'],
	},
];
