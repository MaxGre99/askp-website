'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { navbarList } from './consts';
import NavBtn from '../NavBtn/NavBtn';
import AuthBlock from '../AccountBlock/AccountBlock';
import routes from '@/shared/config/routes';
import TransparentButton from '../TransparentButton/TransparentButton';
import Image from 'next/image';

const Navbar = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);

	return (
		<nav className='flex flex-col w-full max-w-[1440px] mx-auto gap-3 rounded-2xl shadow-lg bg-white/10 backdrop-blur-2xl'>
			<div className='flex items-center justify-between xl:m-0 xl:mx-3 m-3'>
				<Image src='/favicon.png' alt='logo' width={120} height={120} />

				{/* Desktop */}
				<ul className='hidden xl:flex flex-1 ml-10 h-full'>
					{navbarList.map((title) => (
						<li key={title} className='flex mx-auto'>
							<NavBtn href={routes[title as keyof typeof routes]}>
								{t(`navbar.${title}`)}
							</NavBtn>
						</li>
					))}
					<li className='ml-auto'>
						<AuthBlock />
					</li>
				</ul>

				{/* Burger */}
				<TransparentButton
					className='xl:hidden text-white text-3xl px-4'
					onClick={() => setOpen((v) => !v)}
					aria-label='Toggle menu'
					aria-expanded={open}
					aria-controls='mobile-menu'
				>
					☰
				</TransparentButton>
			</div>

			{/* Mobile */}
			{open && (
				<ul id='mobile-menu' className='xl:hidden flex flex-col gap-2 py-4'>
					{navbarList.map((title) => (
						<li key={title}>
							<NavBtn
								href={routes[title as keyof typeof routes]}
								className='h-[80px]'
							>
								{t(`navbar.${title}`)}
							</NavBtn>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
