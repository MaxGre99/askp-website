import { useTranslation } from 'react-i18next';

import { useGetUserQuery } from '@/entities/users';

import { accountSidebarItems } from '../model/sidebar-config';

import { SidebarButton } from './SidebarButton';

export const AccountSidebar = () => {
	const { t } = useTranslation();
	const { data: user } = useGetUserQuery();

	return (
		<nav className='min-w-[300px] max-w-[300px] bg-white rounded-2xl px-6 py-8'>
			<ul className='flex flex-col gap-2'>
				{accountSidebarItems.map(({ title, icon: Icon, access }) => {
					if (!access.includes(user?.role || 'USER')) return null;

					return (
						<li key={title}>
							<SidebarButton
								href={`/account/${title}`}
								className='w-full flex items-center gap-3'
							>
								<Icon size={24} />
								{t(`sidebar.${title}`)}
							</SidebarButton>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
