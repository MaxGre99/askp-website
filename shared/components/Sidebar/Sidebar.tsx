import { useTranslation } from 'react-i18next';
import { sidebarButtons } from './consts';
// import SidebarButtton from '../SidebarButton/SidebarButton';
// import BaseButton from '../BaseButton/BaseButton';
import SidebarButtton from '../SidebarButton/SidebarButton';

const Sidebar = () => {
	const { t } = useTranslation();

	return (
		<nav className='min-w-fit flex-1 bg-white rounded-2xl px-6 py-8'>
			<ul className='flex flex-col gap-2'>
				{sidebarButtons.map(({ title, icon: Icon }) => (
					<li key={title}>
						<SidebarButtton
							href={`/account/${title === 'registerApplications' ? 'register-applications' : title}`}
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

export default Sidebar;
