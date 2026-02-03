'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { navbarList } from './consts';
import NavBtn from '../NavBtn/NavBtn';
import AuthBlock from '../AccountBlock/AccountBlock';
import routes from '@/shared/config/routes';

const Navbar = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);

	return (
		<nav className='flex flex-col w-full max-w-[1440px] mx-auto gap-3 rounded-2xl shadow-lg bg-white/20 backdrop-blur-2xl'>
			<div className='flex items-center justify-between xl:m-0 xl:mx-3 m-3'>
				<img src='/favicon.png' alt='logo' className='h-[120px]' />

				{/* Desktop */}
				<div className='hidden xl:flex flex-1 ml-10 h-full'>
					{navbarList.map((title) => (
						<NavBtn
							key={title}
							href={routes[title as keyof typeof routes] ?? ''}
						>
							{t(`navbar.${title}`)}
						</NavBtn>
					))}
					<AuthBlock />
				</div>

				{/* Burger */}
				<button
					className='xl:hidden text-white text-3xl px-4'
					onClick={() => setOpen((v) => !v)}
					aria-label='Toggle menu'
				>
					☰
				</button>
			</div>

			{/* Mobile */}
			{open && (
				<div className='xl:hidden flex flex-col gap-2 py-4'>
					{navbarList.map((title) => (
						<NavBtn
							key={title}
							href={routes[title as keyof typeof routes]}
							className='h-[80px]'
						>
							{t(`navbar.${title}`)}
						</NavBtn>
					))}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
