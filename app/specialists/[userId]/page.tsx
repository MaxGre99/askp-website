import { Metadata } from 'next';

import { prisma } from '@/shared/lib/prisma';
import { SpecialistPage } from '@/widgets/specialists/specialists-slug';

export async function generateMetadata({
	params,
}: {
	params: { userId: string };
}): Promise<Metadata> {
	const profile = await prisma.profile.findUnique({
		where: { userId: params.userId },
		select: { displayName: true, shortBio: true, avatarUrl: true, city: true },
	});

	if (!profile) return { title: 'Специалист не найден' };

	return {
		title: profile.displayName ?? 'Специалист',
		description: profile.shortBio
			? profile.shortBio.slice(0, 160)
			: `Специалист АСКП${profile.city ? `, ${profile.city}` : ''}`,
		openGraph: {
			title: `${profile.displayName} | АСКП`,
			description: profile.shortBio?.slice(0, 160),
			url: `/specialists/${params.userId}`,
			images: profile.avatarUrl
				? [{ url: profile.avatarUrl, width: 800, height: 800 }]
				: undefined,
		},
		alternates: {
			canonical: `/specialists/${params.userId}`,
		},
	};
}

const Page = () => {
	return <SpecialistPage />;
};

export default Page;
