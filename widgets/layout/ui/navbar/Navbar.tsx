'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/shared/config';

import { NavButton } from '../../../../shared/ui/NavButton';
import { TransparentButton } from '../../../../shared/ui/TransparentButton';
import { navbarButtonsList } from '../../config/navbar-buttons-list';

import { AccountBlock } from './AccountBlock';

export const Navbar = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);

	return (
		<nav className='flex flex-col w-full max-w-[1440px] mx-auto gap-3 rounded-2xl shadow-lg bg-white/10 backdrop-blur-2xl'>
			<div className='flex items-center justify-between xl:m-0 xl:mx-3 m-3'>
				<Link href='/'>
					<Image src='/logo.svg' alt='logo' width={120} height={120} />
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
					<li className='ml-auto'>
						<AccountBlock />
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
					{navbarButtonsList.map((title) => (
						<li key={title}>
							<NavButton
								href={ROUTES[title as keyof typeof ROUTES]}
								className='h-[80px]'
							>
								{t(`navbar.${title}`)}
							</NavButton>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
};
