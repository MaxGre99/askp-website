import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [
					'/account/',
					'/api/',
					'/donate/add',
					'/donate/*/edit',
					'/shop/add',
					'/shop/*/edit',
					'/reset-password',
				],
			},
		],
		sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
	};
}
