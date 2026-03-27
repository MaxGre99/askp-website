import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useDeleteArticleImageMutation } from '@/entities/article-images';
import { useCreateArticleMutation } from '@/entities/articles';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { handleApiError } from '@/shared/lib/handleApiError';
import { trimStrings } from '@/shared/lib/trimStrings';

import { createArticleSchema } from './schema';

export const useCreateArticleForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const [createArticle] = useCreateArticleMutation();
	const [deleteArticleImage] = useDeleteArticleImageMutation();

	// Накапливаем все загруженные в контент URL за сессию
	const uploadedContentUrls = useRef<Set<string>>(new Set());

	const schema = createArticleSchema(t);

	const initialValues = {
		title: '',
		content: '',
		image: '',
		published: false,
	};

	// Вызывается из формы при каждой загрузке картинки в контент
	const trackUploadedUrl = (url: string) => {
		uploadedContentUrls.current.add(url);
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			const article = await createArticle({
				...trimmed,
				image: trimmed.image || null,
			}).unwrap();

			// Удаляем картинки из контента, которые загрузили но не использовали
			const usedUrls = extractImageUrls(trimmed.content);
			const orphanedUrls = [...uploadedContentUrls.current].filter(
				(url) =>
					!usedUrls.includes(url) &&
					url.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!),
			);
			await Promise.allSettled(
				orphanedUrls.map((url) => deleteArticleImage(url)),
			);

			router.push(`/articles/${article.slug}`);
		} catch (err) {
			handleApiError(err);
		}
	};

	return { initialValues, schema, handleSubmit, trackUploadedUrl };
};
