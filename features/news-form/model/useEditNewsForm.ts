import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useGetNewsQuery, useUpdateNewsMutation } from '@/entities/news';
import {
	useDeleteNewsCoverMutation,
	useDeleteNewsImageMutation,
} from '@/entities/news-images';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { handleApiError } from '@/shared/lib/handleApiError';
import { trimStrings } from '@/shared/lib/trimStrings';

import { createNewsSchema } from './schema';

const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL;

export const useEditNewsForm = () => {
	const { t } = useTranslation();
	const { slug } = useParams();
	const router = useRouter();

	const {
		data: news,
		isLoading,
		isError,
		error,
	} = useGetNewsQuery(slug as string);
	const [updateNews] = useUpdateNewsMutation();
	const [deleteNewsImage] = useDeleteNewsImageMutation();
	const [deleteNewsCover] = useDeleteNewsCoverMutation();

	const uploadedContentUrls = useRef<Set<string>>(new Set());

	const schema = createNewsSchema(t);

	const initialValues = {
		title: news?.title ?? '',
		content: news?.content ?? '',
		image: news?.image ?? '',
		published: news?.published ?? true,
	};

	const trackUploadedUrl = (url: string) => {
		uploadedContentUrls.current.add(url);
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			const oldImage = news?.image;
			const newImage = trimmed.image || null;
			if (
				oldImage &&
				oldImage !== newImage &&
				oldImage.startsWith(MINIO_PUBLIC_URL!)
			) {
				await deleteNewsCover(oldImage).unwrap().catch(console.error);
			}

			const updated = await updateNews({
				slug: slug as string,
				body: { ...trimmed, image: trimmed.image || null },
			}).unwrap();

			// Удаляем картинки которые были в оригинале но пропали
			const oldUrls = extractImageUrls(news?.content ?? '');
			const newUrls = extractImageUrls(trimmed.content);
			const removedUrls = oldUrls.filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);

			// Удаляем сиротские из текущей сессии редактирования
			const orphanedUrls = [...uploadedContentUrls.current].filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);

			await Promise.allSettled(
				[...removedUrls, ...orphanedUrls].map((url) => deleteNewsImage(url)),
			);

			router.push(`/news/${updated.slug}`);
		} catch (err) {
			handleApiError(err);
		}
	};

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	return { initialValues, schema, handleSubmit, trackUploadedUrl, isLoading };
};
