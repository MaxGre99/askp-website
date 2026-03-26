import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const createArticleSchema = (t: TFunction) =>
	Yup.object({
		title: Yup.string().required(t('validationErrors.required.title')),
		content: Yup.string()
			.required(t('validationErrors.required.content'))
			.test(
				'not-empty-tiptap',
				t('validationErrors.required.content'),
				(val) => {
					if (!val) return false;
					return val.replace(/<[^>]*>/g, '').trim().length > 0;
				},
			),
		image: Yup.string().nullable().optional(),
		published: Yup.boolean(),
	});
