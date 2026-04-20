import { Metadata } from 'next';

import { prisma } from '@/shared/lib/prisma';
import { NewsSlugPage } from '@/widgets/news/slug';

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const item = await prisma.news.findUnique({
		where: { slug: params.slug },
		select: {
			title: true,
			content: true,
			image: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	if (!item) return { title: 'Новость не найдена' };

	// Чистый текст из контента для description (если content — HTML)
	const description = item.content.replace(/<[^>]+>/g, '').slice(0, 160);

	return {
		title: item.title,
		description,
		openGraph: {
			title: item.title,
			description,
			url: `/news/${params.slug}`,
			type: 'article',
			publishedTime: item.createdAt.toISOString(),
			modifiedTime: item.updatedAt.toISOString(),
			images: item.image
				? [{ url: item.image, width: 1200, height: 630 }]
				: undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: item.title,
			description,
			images: item.image ? [item.image] : undefined,
		},
		alternates: {
			canonical: `/news/${params.slug}`,
		},
	};
}

const Page = () => {
	return <NewsSlugPage />;
};

export default Page;
