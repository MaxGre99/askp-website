import { useTranslation } from 'react-i18next';
import { sidebarTitles } from './consts';
import SidebarBtn from '../SidebarBtn/SidebarBtn';

const Sidebar = () => {
	const { t } = useTranslation();

	return (
		<nav className='min-w-[300px] flex-1 bg-white rounded-2xl px-6 py-8'>
			<ul className='flex flex-col gap-2'>
				{sidebarTitles.map((title) => (
					<li key={title}>
						<SidebarBtn>{t(`sidebar.${title}`)}</SidebarBtn>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Sidebar;
