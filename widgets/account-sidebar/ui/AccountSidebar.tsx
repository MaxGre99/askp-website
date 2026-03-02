import { useTranslation } from 'react-i18next';

import { accountSidebarItems } from '../model/sidebar-config';

import { SidebarButtton } from './SidebarButton';

export const AccountSidebar = () => {
	const { t } = useTranslation();

	return (
		<nav className='min-w-fit max-w-[300px] bg-white rounded-2xl px-6 py-8'>
			<ul className='flex flex-col gap-2'>
				{accountSidebarItems.map(({ title, icon: Icon }) => (
					<li key={title}>
						<SidebarButtton
							href={`/account/${title}`}
							className='w-full flex items-center gap-3'
						>
							<Icon size={24} />
							{t(`sidebar.${title}`)}
						</SidebarButtton>
					</li>
				))}
			</ul>
		</nav>
	);
};
