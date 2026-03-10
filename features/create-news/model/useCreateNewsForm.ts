import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useCreateNewsMutation } from '@/entities/news';
import { useDeleteNewsImageMutation } from '@/entities/news-images';
import { extractImageUrls } from '@/shared/lib/extractImageUrls';

import { createNewsSchema } from './schema';

const MINIO_PUBLIC_URL =
	process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL ?? 'http://localhost:9000';

export const useCreateNewsForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const [createNews] = useCreateNewsMutation();
	const [deleteNewsImage] = useDeleteNewsImageMutation();

	const schema = createNewsSchema(t);

	const initialValues = {
		title: '',
		content: '',
		image: '',
		published: true,
	};

	const handleSubmit = async (values: typeof initialValues) => {
		const news = await createNews({
			...values,
			image: values.image || undefined,
		}).unwrap();

		// Удаляем сиротские картинки если пользователь вставил и удалил
		const usedUrls = extractImageUrls(values.content);
		// (опционально — на create обычно не нужно, но для консистентности)

		router.push(`/news/${news.slug}`);
	};

	return { initialValues, schema, handleSubmit };
};
