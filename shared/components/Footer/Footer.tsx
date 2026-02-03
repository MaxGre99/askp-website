'use client';

import { useTranslation } from 'react-i18next';
import NavBtn from '../NavBtn/NavBtn';
import { navbarList } from './consts';
import { FaPhone, FaEnvelope } from 'react-icons/fa6';
import routes from '@/shared/config/routes';

const Footer = () => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-3 p-5 rounded-2xl shadow-lg bg-white/20 backdrop-blur-2xl w-full max-w-[1440px] mx-auto items-center'>
			{/* Desktop menu */}
			<div className='flex w-full'>
				<div className='flex flex-col gap-2 w-[50%]'>
					{navbarList.map((title) => (
						<NavBtn
							key={title}
							href={routes[title as keyof typeof routes]}
							className='h-[50px]!'
						>
							{t(`navbar.${title}`)}
						</NavBtn>
					))}
				</div>
				<div className='flex flex-col w-[50%] items-center justify-center gap-2'>
					<div className='flex items-center gap-3 text-2xl text-white hover:text-cyan-300 active:text-cyan-200'>
						<FaPhone />
						<a href='tel:+15555555555'>+15555555555</a>
					</div>
					<div className='flex items-center gap-3 text-2xl text-white hover:text-cyan-300 active:text-cyan-200'>
						<FaEnvelope />
						<a href='mailto:someone@example.com'>someone@example.com</a>
					</div>
				</div>
			</div>
			<p className='text-white '>
				© 2026. Профессиональное Психологическое Объединение АСКП
				&quot;Ассоциация Семейного Консультирования и Психотерапии&quot;
			</p>
		</div>
	);
};

export default Footer;
