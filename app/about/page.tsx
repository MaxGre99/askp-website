import { Metadata } from 'next';

import { AboutPage } from '@/widgets/about';

export const metadata: Metadata = {
	title: 'О нас',
	description:
		'История, миссия и команда Ассоциации Семейного Консультирования и Психотерапии.',
	openGraph: { title: 'О нас | АСКП', url: '/about' },
};

const Page = () => {
	return <AboutPage />;
};

export default Page;
