import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import {
	useDeleteProductCoverMutation,
	useDeleteProductImageMutation,
} from '@/entities/product-images';
import {
	useGetProductQuery,
	useUpdateProductMutation,
} from '@/entities/products';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { handleApiError } from '@/shared/lib/handleApiError';
import { redirectWithToast } from '@/shared/lib/redirectWithToast';
import { trimStrings } from '@/shared/lib/trimStrings';

import { productSchema } from './schema';

const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL;

export const useEditProductForm = () => {
	const { t } = useTranslation();
	const { slug } = useParams();
	const router = useRouter();
	const {
		data: product,
		isLoading,
		isError,
		error,
	} = useGetProductQuery(slug as string);
	const [updateProduct] = useUpdateProductMutation();
	const [deleteProductCover] = useDeleteProductCoverMutation();
	const [deleteProductImage] = useDeleteProductImageMutation();
	const uploadedDescriptionUrls = useRef<Set<string>>(new Set());

	const initialValues = {
		name: product?.name ?? '',
		description: product?.description ?? '',
		contentLink: product?.contentLink ?? '',
		price: product?.price ?? 0,
		images: product?.images ?? [],
		published: product?.published ?? false,
	};

	const schema = productSchema(t);

	const trackUploadedUrl = (url: string) =>
		uploadedDescriptionUrls.current.add(url);

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			// Удаляем картинки слайдера которые пропали
			const oldImages = product?.images ?? [];
			const removedImages = oldImages.filter(
				(url) =>
					!trimmed.images.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);
			await Promise.allSettled(
				removedImages.map((url) => deleteProductCover(url)),
			);

			const updated = await updateProduct({
				slug: slug as string,
				body: {
					...trimmed,
					images: trimmed.images.filter(Boolean),
				},
			}).unwrap();

			// Удаляем картинки описания которые пропали
			const oldUrls = extractImageUrls(product?.description ?? '');
			const newUrls = extractImageUrls(trimmed.description);
			const removedUrls = oldUrls.filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);
			const orphanedUrls = [...uploadedDescriptionUrls.current].filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);
			await Promise.allSettled(
				[...removedUrls, ...orphanedUrls].map((url) => deleteProductImage(url)),
			);

			redirectWithToast(
				router,
				`/shop/${updated.slug}`,
				t('notifications.editProductSuccess'),
				'success',
			);
		} catch (err) {
			handleApiError(err);
		}
	};

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	return {
		initialValues,
		schema,
		handleSubmit,
		trackUploadedUrl,
		isLoading,
	};
};
