import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useGetEventQuery, useUpdateEventMutation } from '@/entities/events';
import { formatForDatetimeLocal, trimStrings } from '@/shared/lib/formatters';
import {
	extractImageUrls,
	handleApiError,
	redirectWithToast,
} from '@/shared/lib/helpers';

import {
	useDeleteEventCoverMutation,
	useDeleteEventImageMutation,
} from '../api/eventImagesApi';

import { createEventSchema } from './schema';

const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL;

export const useEditEventForm = () => {
	const { t } = useTranslation();
	const { slug } = useParams();
	const router = useRouter();

	const {
		data: event,
		isLoading,
		isError,
		error,
	} = useGetEventQuery(slug as string);
	const [updateEvent] = useUpdateEventMutation();
	const [deleteEventImage] = useDeleteEventImageMutation();
	const [deleteEventCover] = useDeleteEventCoverMutation();

	const uploadedContentUrls = useRef<Set<string>>(new Set());

	const schema = createEventSchema(t);

	const initialValues = {
		title: event?.title ?? '',
		description: event?.description ?? '',
		image: event?.image ?? '',
		eventDate: formatForDatetimeLocal(event?.eventDate), // ← было event?.eventDate ?? ''
		published: event?.published ?? true,
	};

	const trackUploadedUrl = (url: string) => {
		uploadedContentUrls.current.add(url);
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			const oldImage = event?.image;
			const newImage = trimmed.image || null;
			if (
				oldImage &&
				oldImage !== newImage &&
				oldImage.startsWith(MINIO_PUBLIC_URL!)
			) {
				await deleteEventCover(oldImage).unwrap().catch(console.error);
			}

			const updated = await updateEvent({
				slug: slug as string,
				body: { ...trimmed, image: newImage },
			}).unwrap();

			// Удаляем картинки которые были в оригинале но пропали
			const oldUrls = extractImageUrls(event?.description ?? '');
			const newUrls = extractImageUrls(trimmed.description);
			const removedUrls = oldUrls.filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);

			// Удаляем сиротские из текущей сессии редактирования
			const orphanedUrls = [...uploadedContentUrls.current].filter(
				(url) => !newUrls.includes(url) && url.startsWith(MINIO_PUBLIC_URL!),
			);

			await Promise.allSettled(
				[...removedUrls, ...orphanedUrls].map((url) => deleteEventImage(url)),
			);

			redirectWithToast(
				router,
				`/events/${updated.slug}`,
				t('notifications.editEventSuccess'),
				'success',
			);
		} catch (err) {
			handleApiError(err);
		}
	};

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	return { initialValues, schema, handleSubmit, trackUploadedUrl, isLoading };
};
