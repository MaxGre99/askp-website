import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useDeleteProductImageMutation } from '@/entities/product-images';
import { useCreateProductMutation } from '@/entities/products';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { trimStrings } from '@/shared/lib/trimStrings';

import { productSchema } from './schema';

export const useCreateProductForm = () => {
	const router = useRouter();
	const [createProduct] = useCreateProductMutation();
	const [deleteProductImage] = useDeleteProductImageMutation();
	const uploadedDescriptionUrls = useRef<Set<string>>(new Set());

	const initialValues = {
		name: '',
		description: '',
		contentLink: '',
		price: 0,
		images: [] as string[],
		published: false,
	};

	const trackUploadedUrl = (url: string) =>
		uploadedDescriptionUrls.current.add(url);

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			const product = await createProduct(trimmed).unwrap();

			const usedUrls = extractImageUrls(trimmed.description);
			const orphanedUrls = [...uploadedDescriptionUrls.current].filter(
				(url) =>
					!usedUrls.includes(url) &&
					url.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!),
			);
			await Promise.allSettled(
				orphanedUrls.map((url) => deleteProductImage(url)),
			);

			router.push(`/shop/${product.slug}`);
		} catch (err) {
			console.error(err);
		}
	};

	return {
		initialValues,
		schema: productSchema,
		handleSubmit,
		trackUploadedUrl,
	};
};
