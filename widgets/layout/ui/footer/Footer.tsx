'use client';

import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhone } from 'react-icons/fa6';

import { ROUTES } from '@/shared/config';
import { EmailLink } from '@/shared/ui/EmailLink';

import { NavButton } from '../../../../shared/ui/NavButton';
import { footerButtonsList } from '../../config/footer-buttons-list';

export const Footer = () => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-3 p-5 rounded-2xl shadow-lg bg-white/10 backdrop-blur-2xl w-full max-w-[1440px] mx-auto items-center'>
			<div className='flex w-full items-center p-3'>
				<ul className='flex flex-row gap-2 justify-evenly flex-1 items-center'>
					{footerButtonsList.map((title) => (
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
				<div className='flex flex-col items-center justify-center gap-2 w-[33%]'>
					<div className='flex items-center gap-3 text-2xl text-white hover:text-cyan-300 active:text-cyan-200'>
						<FaPhone />
						<a href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}>
							{process.env.NEXT_PUBLIC_CONTACT_PHONE}
						</a>
					</div>
					<div className='flex items-center gap-3 text-2xl text-white hover:text-cyan-300 active:text-cyan-200'>
						<FaEnvelope />
						<EmailLink className='text-white hover:text-cyan-300 active:text-cyan-200' />
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
