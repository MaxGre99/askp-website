import { NextResponse } from 'next/server';

import { deleteS3File } from '@/shared/lib/deleteS3File';
import { slugify } from '@/shared/lib/formatters';
// import { Prisma } from '@prisma/client';
import { getAuthUser } from '@/shared/lib/getAuthUser';
import { handleRouteError } from '@/shared/lib/handleRouteError';
import { extractImageUrls } from '@/shared/lib/helpers';
import { prisma } from '@/shared/lib/prisma';

export const GET = async (
	_req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	try {
		// Пробуем получить роль, не кидая ошибку
		let isAdmin = false;
		try {
			const user = await getAuthUser();
			isAdmin = user.role === 'ADMIN' || user.role === 'OWNER';
		} catch {}

		const { slug } = await params;

		const product = await prisma.product.findUnique({
			where: { slug },
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
				contentLink: isAdmin, // ← только для админа
			},
		});

		if (!product)
			return NextResponse.json({ error: 'not_found' }, { status: 404 });

		return NextResponse.json(product);
	} catch (err) {
		return handleRouteError(err, 'GET_PRODUCT_ERROR');
		// return NextResponse.json(
		// 	{ error: 'failed_to_fetch_product' },
		// 	{ status: 500 },
		// );
	}
};

export const PATCH = async (
	req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	try {
		await getAuthUser('ADMIN');

		const { slug } = await params;

		const body = await req.json();

		const updated = await prisma.product.update({
			where: { slug },
			data: { ...body, slug: body.name ? slugify(body.name) : undefined },
		});

		return NextResponse.json(updated);
	} catch (err) {
		return handleRouteError(err, 'UPDATE_PRODUCT_ERROR');
		// if (
		// 	err instanceof Prisma.PrismaClientKnownRequestError &&
		// 	err.code === 'P2002'
		// ) {
		// 	return NextResponse.json(
		// 		{ error: 'slug_already_exists' },
		// 		{ status: 409 },
		// 	);
		// }
		// return NextResponse.json(
		// 	{ error: 'failed_to_update_product' },
		// 	{ status: 500 },
		// );
	}
};

export const DELETE = async (
	_req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) => {
	try {
		await getAuthUser('ADMIN');

		const { slug } = await params;

		const product = await prisma.product.findUnique({ where: { slug } });
		if (!product)
			return NextResponse.json({ error: 'not_found' }, { status: 404 });

		await Promise.allSettled([
			...product.images
				.filter((url) =>
					url.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!),
				)
				.map((url) => deleteS3File(url, 'product-covers')),
			...extractImageUrls(product.description)
				.filter((url) =>
					url.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!),
				)
				.map((url) => deleteS3File(url, 'product-images')),
		]);

		await prisma.product.delete({ where: { slug } });

		return NextResponse.json({ ok: true });
	} catch (err) {
		return handleRouteError(err, 'DELETE_PRODUCT_ERROR');
	}
};
