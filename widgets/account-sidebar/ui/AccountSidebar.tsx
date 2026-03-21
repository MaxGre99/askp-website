import { useTranslation } from 'react-i18next';

import { useGetMeQuery } from '@/entities/users';

import { accountSidebarConfig } from '../model/sidebar-config';

import { SidebarButton } from './SidebarButton';

export const AccountSidebar = () => {
	const { t } = useTranslation();
	const { data: user } = useGetMeQuery();
	const groups = Object.values(accountSidebarConfig);

	return (
		<nav className='min-w-[300px] w-[300px] bg-white rounded-2xl px-6 py-8'>
			<ul className='flex flex-col gap-2'>
				{groups.map((group, groupIndex) => {
					const visibleItems = group.filter(({ access }) =>
						access.includes(user?.role || 'USER'),
					);
					if (visibleItems.length === 0) return null;

					return (
						<li key={groupIndex}>
							{groupIndex > 0 && <hr className='border-gray-200 mb-2' />}
							<ul className='flex flex-col gap-2'>
								{visibleItems.map(({ title, href, icon: Icon }) => (
									<li key={title}>
										<SidebarButton
											href={`/account/${href}`}
											className='w-full flex items-center gap-3'
										>
											<Icon size={24} className='shrink-0' />
											{t(`sidebar.${title}`)}
										</SidebarButton>
									</li>
								))}
							</ul>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
