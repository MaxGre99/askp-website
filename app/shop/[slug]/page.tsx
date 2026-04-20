import { Metadata } from 'next';

import { prisma } from '@/shared/lib/prisma';
import { ProductSlugPage } from '@/widgets/products/slug';

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const product = await prisma.product.findUnique({
		where: { slug: params.slug },
		select: { name: true, description: true, images: true, price: true },
	});

	if (!product) return { title: 'Товар не найден' };

	return {
		title: product.name,
		description: product.description.slice(0, 160),
		openGraph: {
			title: `${product.name} | АСКП`,
			description: product.description.slice(0, 160),
			url: `/shop/${params.slug}`,
			type: 'website',
			images: product.images[0]
				? [{ url: product.images[0], width: 1200, height: 630 }]
				: undefined,
		},
		alternates: {
			canonical: `/shop/${params.slug}`,
		},
	};
}

const Page = () => {
	return <ProductSlugPage />;
};

export default Page;
