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
		<div className='flex flex-col gap-4 p-4 rounded-2xl shadow-lg bg-white/10 backdrop-blur-2xl w-full max-w-[1440px] mx-auto items-center xl:p-6 '>
			<div className='flex flex-col w-full items-center gap-3 lg:flex-row xl:p-3'>
				<ul className='flex flex-col gap-2 justify-evenly flex-1 items-center w-full md:flex-row md:flex-wrap lg:w-[50%]'>
					{footerButtonsList.map((title) => (
						<li
							key={title}
							className='flex w-full items-center justify-center md:w-[calc(50%-8px)] xl:mx-auto'
						>
							<NavButton href={ROUTES[title as keyof typeof ROUTES]}>
								{t(`navbar.${title}`)}
							</NavButton>
						</li>
					))}
				</ul>
				<div className='flex flex-col w-full items-center justify-center gap-2 md:flex-row md:justify-between lg:w-[33%] lg:flex-col'>
					<div className='flex items-center justify-center gap-3 text-xl text-white hover:text-cyan-300 active:text-cyan-200 md:w-[calc(50%-8px)] md:mr-[36px] lg:mr-0 lg:w-full'>
						<FaPhone />
						<a href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}>
							{process.env.NEXT_PUBLIC_CONTACT_PHONE}
						</a>
					</div>
					<div className='flex items-center justify-center gap-3 text-xl text-white hover:text-cyan-300 active:text-cyan-200 md:w-[calc(50%-8px)] md:mr-[18px] lg:mr-0 lg:w-full'>
						<FaEnvelope />
						<EmailLink className='text-white hover:text-cyan-300 active:text-cyan-200' />
					</div>
				</div>
			</div>
			<p className='text-white text-center'>
				© 2026. Профессиональное Психологическое Объединение АСКП
				&quot;Ассоциация Семейного Консультирования и Психотерапии&quot;
			</p>
		</div>
	);
};
