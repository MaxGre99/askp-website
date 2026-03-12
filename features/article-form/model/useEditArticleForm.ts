import { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useDeleteArticleImageMutation } from '@/entities/article-images';
import {
	useGetArticleQuery,
	useUpdateArticleMutation,
} from '@/entities/articles';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';

import { createArticleSchema } from './schema';

const MINIO_PUBLIC_URL =
	process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL ?? 'http://localhost:9000';

export const useEditArticleForm = () => {
	const { t } = useTranslation();
	const { slug } = useParams();
	const router = useRouter();

	const { data: article, isLoading } = useGetArticleQuery(slug as string);
	const [updateArticle] = useUpdateArticleMutation();
	const [deleteArticleImage] = useDeleteArticleImageMutation();

	const uploadedContentUrls = useRef<Set<string>>(new Set());

	const schema = createArticleSchema(t);

	const initialValues = {
		title: article?.title ?? '',
		content: article?.content ?? '',
		image: article?.image ?? '',
		published: article?.published ?? true,
	};

	const trackUploadedUrl = (url: string) => {
		uploadedContentUrls.current.add(url);
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const updated = await updateArticle({
				slug: slug as string,
				body: { ...values, image: values.image || undefined },
			}).unwrap();

			// Удаляем картинки которые были в оригинале но пропали
			const oldUrls = extractImageUrls(article?.content ?? '');
			const newUrls = extractImageUrls(values.content);
			const removedUrls = oldUrls.filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL),
			);

			// Удаляем сиротские из текущей сессии редактирования
			const orphanedUrls = [...uploadedContentUrls.current].filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL),
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
