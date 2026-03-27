import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import { getAuthUser } from '@/shared/lib/auth';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { prisma } from '@/shared/lib/prisma';
import { slugify } from '@/shared/lib/slugify';

export const GET = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const query = url.searchParams.get('query') || '';
		const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
		const pageSize = Math.min(
			50,
			Math.max(1, Number(url.searchParams.get('pageSize') ?? 8)),
		);

		const showAll = url.searchParams.get('showAll') === 'true';

		const where: Prisma.ProductWhereInput = {
			...(query && { name: { contains: query, mode: 'insensitive' } }),
			...(!showAll && { published: true }),
		};

		const total = await prisma.product.count({ where });
		const products = await prisma.product.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip: (page - 1) * pageSize,
			take: pageSize,
			select: {
				id: true,
				slug: true,
				name: true,
				description: true,
				price: true,
				images: true,
				published: true,
				createdAt: true,
				updatedAt: true,
				// contentLink — НЕ выбираем публично
			},
		});

		return NextResponse.json({ products, total });
	} catch (err) {
		return handleRouteError(err, 'GET_PRODUCTS_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_fetch_products' },
		// 	{ status: 500 },
		// );
	}
};

export const POST = async (req: Request) => {
	try {
		await getAuthUser('ADMIN');

		const { name, description, contentLink, price, images, published } =
			await req.json();

		const slug = slugify(name);

		const product = await prisma.product.create({
			data: {
				name,
				slug,
				description,
				contentLink,
				price,
				images: images ?? [],
				published: published ?? false,
			},
		});

		return NextResponse.json(product);
	} catch (err) {
		return handleRouteError(err, 'CREATE_PRODUCT_ERROR');
	}
};
