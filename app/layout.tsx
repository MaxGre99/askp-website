import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';

import { ToastContainer } from 'react-toastify';

import { CookieBanner } from '@/features/cookie-consent';
import { Footer, Navbar } from '@/widgets/layout';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { ClientToasts } from './ClientToasts';
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
	title: 'АСКП | "Ассоциация Семейного Консультирования и Психотерапии"',
	description:
		'Профессиональное Психологическое Объединение АСКП "Ассоциация Семейного Консультирования и Психотерапии"',
	icons: {
		icon: '/favicon.png',
		shortcut: '/favicon.png',
		apple: '/favicon.png',
	},
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='ru'>
			<body
				className={`${oswald.variable} ${inter.variable} antialiased min-w-full min-h-[100svh] mx-auto`}
			>
				<Providers>
					<div id='modal-root' />
					<ToastContainer />
					<CookieBanner />
					<ClientToasts />

					<div className='flex flex-col gap-3 min-h-[100svh]'>
						<header className='z-5'>
							<Navbar />
						</header>

						<main className='flex flex-1 flex-col items-center justify-center gap-6 p-6 rounded-2xl shadow-lg bg-white/10 backdrop-blur-2xl w-full max-w-[1440px] mx-auto'>
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
