import type { Metadata } from 'next';
import { Bad_Script, Inter } from 'next/font/google';

import { Footer, Navbar } from '@/widgets/layout';

import { Providers } from './providers';

import './globals.css';
import 'swiper/css';

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

					<main className='flex flex-1 flex-col items-center justify-center gap-5 p-5 rounded-2xl shadow-lg bg-white/10 backdrop-blur-2xl w-full max-w-[1440px] mx-auto'>
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
