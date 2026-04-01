'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { TiThMenu } from 'react-icons/ti';

import { ROUTES } from '@/shared/config';

import { Button } from '../../../../shared/ui/Button';
import { NavButton } from '../../../../shared/ui/NavButton';
import { navbarButtonsList } from '../../config/navbar-buttons-list';

import { AccountBlock } from './AccountBlock';

export const Navbar = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);

	return (
		<nav className='flex flex-col w-full max-w-[1440px] mx-auto rounded-2xl shadow-lg bg-white/10 backdrop-blur-2xl'>
			<div className='flex items-center justify-between m-3 gap-3 xl:m-0 xl:mx-3 xl:gap-0'>
				<Link href='/'>
					<Image
						src='/logo.svg'
						alt='logo'
						width={120}
						height={120}
						className='transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]'
					/>
				</Link>
				{/* Desktop */}
				<ul className='hidden xl:flex flex-1 ml-10 h-full'>
					{navbarButtonsList.map((title) => (
						<li
							key={title}
							className='flex mx-auto items-center justify-center'
						>
							<NavButton href={ROUTES[title as keyof typeof ROUTES]}>
								{t(`navbar.${title}`)}
							</NavButton>
						</li>
					))}
				</ul>
				{/* Burger */}
				<Button
					className='text-white text-3xl px-4 w-full font-oswald xl:hidden '
					onClick={() => setOpen((v) => !v)}
					aria-label='Toggle menu'
					aria-expanded={open}
					aria-controls='mobile-menu'
					variant='ghost'
				>
					<TiThMenu />
					Меню
				</Button>
				<AccountBlock />
			</div>

			{/* Mobile */}
			{open && (
				<ul
					id='mobile-menu'
					className='flex flex-wrap w-full justify-evenly gap-2 pb-2 xl:hidden '
				>
					{navbarButtonsList.map((title) => (
						<li key={title} className='w-fit text-nowrap h-fit'>
							<NavButton href={ROUTES[title as keyof typeof ROUTES]}>
								{t(`navbar.${title}`)}
							</NavButton>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
};
