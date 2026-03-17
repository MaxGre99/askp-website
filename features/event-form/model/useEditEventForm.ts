import { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import {
	useDeleteEventCoverMutation,
	useDeleteEventImageMutation,
} from '@/entities/event-images';
import { useGetEventQuery, useUpdateEventMutation } from '@/entities/events';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';
import { formatForDatetimeLocal } from '@/shared/lib/formatForDatetimeLocal';

import { createEventSchema } from './schema';

const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL;

export const useEditEventForm = () => {
	const { t } = useTranslation();
	const { slug } = useParams();
	const router = useRouter();

	const { data: event, isLoading } = useGetEventQuery(slug as string);
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
			const oldImage = event?.image;
			const newImage = values.image || null;
			if (
				oldImage &&
				oldImage !== newImage &&
				oldImage.startsWith(MINIO_PUBLIC_URL!)
			) {
				await deleteEventCover(oldImage).unwrap().catch(console.error);
			}

			const updated = await updateEvent({
				slug: slug as string,
				body: { ...values, image: values.image || undefined },
			}).unwrap();

			// Удаляем картинки которые были в оригинале но пропали
			const oldUrls = extractImageUrls(event?.description ?? '');
			const newUrls = extractImageUrls(values.description);
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

			router.push(`/events/${updated.slug}`);
		} catch (err) {
			console.error(err);
		}
	};

	return { initialValues, schema, handleSubmit, trackUploadedUrl, isLoading };
};
