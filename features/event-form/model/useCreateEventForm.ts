import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useCreateEventMutation } from '@/entities/events';
import { trimStrings } from '@/shared/lib/formatters';
import {
	extractImageUrls,
	handleApiError,
	redirectWithToast,
} from '@/shared/lib/helpers';

import { useDeleteEventImageMutation } from '../api/eventImagesApi';

import { createEventSchema } from './schema';

export const useCreateEventForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const [createEvent] = useCreateEventMutation();
	const [deleteEventImage] = useDeleteEventImageMutation();

	// Накапливаем все загруженные в контент URL за сессию
	const uploadedContentUrls = useRef<Set<string>>(new Set());

	const schema = createEventSchema(t);

	const initialValues = {
		title: '',
		description: '',
		image: '',
		eventDate: '',
		published: true,
	};

	// Вызывается из формы при каждой загрузке картинки в контент
	const trackUploadedUrl = (url: string) => {
		uploadedContentUrls.current.add(url);
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			const event = await createEvent({
				...trimmed,
				image: trimmed.image || null,
			}).unwrap();

			// Удаляем картинки из контента, которые загрузили но не использовали
			const usedUrls = extractImageUrls(trimmed.description);
			const orphanedUrls = [...uploadedContentUrls.current].filter(
				(url) =>
					!usedUrls.includes(url) &&
					url.startsWith(process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL!),
			);
			await Promise.allSettled(
				orphanedUrls.map((url) => deleteEventImage(url)),
			);

			redirectWithToast(
				router,
				`/events/${event.slug}`,
				t('notifications.createEventSuccess'),
				'success',
			);
		} catch (err) {
			handleApiError(err);
		}
	};

	return { initialValues, schema, handleSubmit, trackUploadedUrl };
};
