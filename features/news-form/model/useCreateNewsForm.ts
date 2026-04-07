import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useCreateNewsMutation } from '@/entities/news';
import { trimStrings } from '@/shared/lib/formatters';
import {
	extractImageUrls,
	handleApiError,
	redirectWithToast,
} from '@/shared/lib/helpers';

import { useDeleteNewsImageMutation } from '../api/newsImagesApi';

import { createNewsSchema } from './schema';

export const useCreateNewsForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const [createNews] = useCreateNewsMutation();
	const [deleteNewsImage] = useDeleteNewsImageMutation();

	// Накапливаем все загруженные в контент URL за сессию
	const uploadedContentUrls = useRef<Set<string>>(new Set());

	const schema = createNewsSchema(t);

	const initialValues = {
		title: '',
		content: '',
		image: '',
		published: true,
	};

	// Вызывается из формы при каждой загрузке картинки в контент
	const trackUploadedUrl = (url: string) => {
		uploadedContentUrls.current.add(url);
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			const news = await createNews({
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
			await Promise.allSettled(orphanedUrls.map((url) => deleteNewsImage(url)));

			redirectWithToast(
				router,
				`/news/${news.slug}`,
				t('notifications.createNewsSuccess'),
				'success',
			);
		} catch (err) {
			handleApiError(err);
		}
	};

	return { initialValues, schema, handleSubmit, trackUploadedUrl };
};
