import { MetadataRoute } from 'next';

import { prisma } from '@/shared/lib/prisma';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [news, events, articles, profiles, products] = await Promise.all([
		prisma.news.findMany({
			where: { published: true },
			select: { slug: true, updatedAt: true },
		}),
		prisma.event.findMany({
			where: { published: true },
			select: { slug: true, updatedAt: true, eventDate: true },
		}),
		prisma.article.findMany({
			where: { published: true },
			select: { slug: true, updatedAt: true },
		}),
		prisma.profile.findMany({
			where: {
				user: { status: 'ACTIVE' },
				avatarUrl: { not: null },
				displayName: { not: null },
				shortBio: { not: null },
				city: { not: null },
			},
			select: { userId: true, updatedAt: true },
		}),
		prisma.product.findMany({
			where: { published: true },
			select: { slug: true, updatedAt: true },
		}),
	]);

	// Статические публичные страницы
	const staticPages: MetadataRoute.Sitemap = [
		{ url: BASE_URL, priority: 1.0, changeFrequency: 'daily' },
		{ url: `${BASE_URL}/news`, priority: 0.9, changeFrequency: 'daily' },
		{ url: `${BASE_URL}/events`, priority: 0.9, changeFrequency: 'daily' },
		{ url: `${BASE_URL}/articles`, priority: 0.9, changeFrequency: 'weekly' },
		{
			url: `${BASE_URL}/specialists`,
			priority: 0.8,
			changeFrequency: 'weekly',
		},
		{ url: `${BASE_URL}/shop`, priority: 0.7, changeFrequency: 'weekly' },
		{ url: `${BASE_URL}/donate`, priority: 0.6, changeFrequency: 'monthly' },
		{ url: `${BASE_URL}/about`, priority: 0.5, changeFrequency: 'monthly' },
		{ url: `${BASE_URL}/register`, priority: 0.6, changeFrequency: 'yearly' },
		{ url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
		{ url: `${BASE_URL}/agreement`, priority: 0.3, changeFrequency: 'yearly' },
		{ url: `${BASE_URL}/cookies`, priority: 0.3, changeFrequency: 'yearly' },
	];

	return [
		...staticPages,

		...news.map((item) => ({
			url: `${BASE_URL}/news/${item.slug}`,
			lastModified: item.updatedAt,
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		})),

		...events.map((item) => ({
			url: `${BASE_URL}/events/${item.slug}`,
			lastModified:
				item.updatedAt > item.eventDate ? item.updatedAt : item.eventDate,
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		})),

		...articles.map((item) => ({
			url: `${BASE_URL}/articles/${item.slug}`,
			lastModified: item.updatedAt,
			changeFrequency: 'weekly' as const,
			priority: 0.7,
		})),

		...profiles.map((profile) => ({
			url: `${BASE_URL}/specialists/${profile.userId}`,
			lastModified: profile.updatedAt,
			changeFrequency: 'weekly' as const,
			priority: 0.6,
		})),

		...products.map((product) => ({
			url: `${BASE_URL}/shop/${product.slug}`,
			lastModified: product.updatedAt,
			changeFrequency: 'weekly' as const,
			priority: 0.6,
		})),
	];
}
