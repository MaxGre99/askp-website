import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';

import { ToastContainer } from 'react-toastify';

import { CookieBanner } from '@/features/cookie-consent';
import { ClientToasts } from '@/shared/ui/ClientToasts';
import { ScrollToTop } from '@/shared/ui/ScrollToTop';
import { Footer, Navbar } from '@/widgets/layout';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { Providers } from './providers';

import './globals.css';
import 'swiper/css';

const oswald = Oswald({
	weight: ['400', '500', '600', '700'],
	variable: '--font-oswald',
	display: 'swap',
});

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
	display: 'swap',
});

export const metadata: Metadata = {
	title: {
		default: 'АСКП — Ассоциация Семейного Консультирования и Психотерапии',
		template: '%s | АСКП',
	},
	description:
		'Профессиональное объединение специалистов в области семейного консультирования и психотерапии. Новости, события, статьи, каталог специалистов.',

	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),

	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		siteName: 'АСКП',
		title: 'АСКП — Ассоциация Семейного Консультирования и Психотерапии',
		description:
			'Профессиональное объединение специалистов в области семейного консультирования и психотерапии.',
		images: [
			{
				url: '/og-default.jpg',
				width: 1200,
				height: 630,
				alt: 'АСКП',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: 'АСКП — Ассоциация Семейного Консультирования и Психотерапии',
		description:
			'Профессиональное объединение специалистов в области семейного консультирования и психотерапии.',
		images: ['/og-default.jpg'],
	},

	icons: {
		icon: '/favicon.png',
		shortcut: '/favicon.png',
		apple: '/favicon.png',
	},

	robots: {
		index: true,
		follow: true,
	},
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='ru' className='w-full'>
			<body
				className={`${oswald.variable} ${inter.variable} antialiased min-w-full min-h-[100svh] mx-auto`}
			>
				<Providers>
					<div id='modal-root' />
					<ToastContainer />
					<CookieBanner />
					<ClientToasts />
					<ScrollToTop />

					<div className='flex flex-col gap-3 min-h-[100svh]'>
						<header className='z-5'>
							<Navbar />
						</header>

						<main className='flex flex-1 flex-col items-center justify-center gap-6 p-4 rounded-2xl shadow-lg bg-white/10 backdrop-blur-2xl w-full max-w-[1440px] mx-auto xl:p-6'>
							{children}
						</main>

						<footer>
							<Footer />
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
