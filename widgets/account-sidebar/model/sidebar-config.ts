import { FaCalendarDay, FaUserFriends } from 'react-icons/fa';
import { FaNewspaper, FaUser, FaUserClock, FaUserLock } from 'react-icons/fa6';
import { PiArticleMediumBold } from 'react-icons/pi';

export const accountSidebarConfig = {
	userBlocks: [
		{
			title: 'profile',
			href: 'profile',
			icon: FaUser,
			access: ['OWNER', 'ADMIN', 'USER'],
		},
	],
	myBlocks: [
		{
			title: 'myNews',
			href: 'my-news',
			icon: FaNewspaper,
			access: ['OWNER', 'ADMIN'],
		},
		{
			title: 'myEvents',
			href: 'my-events',
			icon: FaCalendarDay,
			access: ['OWNER', 'ADMIN'],
		},
		{
			title: 'myArticles',
			href: 'my-articles',
			icon: PiArticleMediumBold,
			access: ['OWNER', 'ADMIN'],
		},
	],
	allBlocks: [
		{
			title: 'allNews',
			href: 'all-news',
			icon: FaNewspaper,
			access: ['OWNER', 'ADMIN'],
		},
		{
			title: 'allEvents',
			href: 'all-events',
			icon: FaCalendarDay,
			access: ['OWNER', 'ADMIN'],
		},
		{
			title: 'allArticles',
			href: 'all-articles',
			icon: PiArticleMediumBold,
			access: ['OWNER', 'ADMIN'],
		},
	],
	usersBlocks: [
		{
			title: 'pendingUsers',
			href: 'pending-users',
			icon: FaUserClock,
			access: ['OWNER', 'ADMIN'],
		},
		{
			title: 'allUsers',
			href: 'all-users',
			icon: FaUserFriends,
			access: ['OWNER', 'ADMIN'],
		},
		{
			title: 'blockedUsers',
			href: 'blocked-users',
			icon: FaUserLock,
			access: ['OWNER', 'ADMIN'],
		},
	],
};
