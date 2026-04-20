import { Metadata } from 'next';

import { SignUpPage } from '@/widgets/sign-up';

export const metadata: Metadata = {
	title: 'Вступить в АСКП',
	description:
		'Подайте заявку на вступление в Ассоциацию Семейного Консультирования и Психотерапии.',
	openGraph: { title: 'Вступить в АСКП', url: '/register' },
};

const Page = () => {
	return <SignUpPage />;
};

export default Page;
