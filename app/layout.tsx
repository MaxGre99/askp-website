import type { Metadata } from 'next';
import './globals.css';
import 'swiper/css';

import Navbar from '@/shared/components/Navbar/Navbar';
import Footer from '@/shared/components/Footer/Footer';
import Providers from './providers';

import { Bad_Script, Inter } from 'next/font/google';

const badScript = Bad_Script({
	weight: '400',
	variable: '--font-bad-script',
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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ru'>
			<body
				className={`${badScript.variable} ${inter.variable} antialiased min-w-full min-h-[100svh] mx-auto flex flex-col gap-3`}
			>
				<Providers>
					<header className='z-5'>
						<Navbar />
					</header>

					<main className='flex flex-col gap-5 p-5 rounded-2xl shadow-lg bg-white/20 backdrop-blur-2xl w-full max-w-[1440px] mx-auto min-h-[calc(100svh-348px)]'>
						{children}
					</main>

					<footer>
						<Footer />
					</footer>
				</Providers>
			</body>
		</html>
	);
}
