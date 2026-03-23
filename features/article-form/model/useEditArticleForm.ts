import { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import {
	useDeleteArticleCoverMutation,
	useDeleteArticleImageMutation,
} from '@/entities/article-images';
import {
	useGetArticleQuery,
	useUpdateArticleMutation,
} from '@/entities/articles';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { trimStrings } from '@/shared/lib/trimStrings';

import { createArticleSchema } from './schema';

const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL;

export const useEditArticleForm = () => {
	const { t } = useTranslation();
	const { slug } = useParams();
	const router = useRouter();

	const { data: article, isLoading } = useGetArticleQuery(slug as string);
	const [updateArticle] = useUpdateArticleMutation();
	const [deleteArticleImage] = useDeleteArticleImageMutation();
	const [deleteArticleCover] = useDeleteArticleCoverMutation();

	const uploadedContentUrls = useRef<Set<string>>(new Set());

	const schema = createArticleSchema(t);

	const initialValues = {
		title: article?.title ?? '',
		content: article?.content ?? '',
		image: article?.image ?? '',
		published: /* article?.published ?? */ false,
	};

	const trackUploadedUrl = (url: string) => {
		uploadedContentUrls.current.add(url);
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			const oldImage = article?.image;
			const newImage = trimmed.image || null;
			if (
				oldImage &&
				oldImage !== newImage &&
				oldImage.startsWith(MINIO_PUBLIC_URL!)
			) {
				await deleteArticleCover(oldImage).unwrap().catch(console.error);
			}

			const updated = await updateArticle({
				slug: slug as string,
				body: { ...trimmed, image: trimmed.image || null },
			}).unwrap();

			// Удаляем картинки которые были в оригинале но пропали
			const oldUrls = extractImageUrls(article?.content ?? '');
			const newUrls = extractImageUrls(trimmed.content);
			const removedUrls = oldUrls.filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);

			// Удаляем сиротские из текущей сессии редактирования
			const orphanedUrls = [...uploadedContentUrls.current].filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);

			await Promise.allSettled(
				[...removedUrls, ...orphanedUrls].map((url) => deleteArticleImage(url)),
			);

			router.push(`/articles/${updated.slug}`);
		} catch (err) {
			console.error(err);
		}
	};

	return { initialValues, schema, handleSubmit, trackUploadedUrl, isLoading };
};
