import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const createEventSchema = (t: TFunction) =>
	Yup.object({
		title: Yup.string().required(t('validationErrors.required.title')),
		description: Yup.string()
			.required(t('validationErrors.required.description'))
			.test(
				'not-empty-tiptap',
				t('validationErrors.required.description'),
				(val) => {
					if (!val) return false;
					return val.replace(/<[^>]*>/g, '').trim().length > 0;
				},
			),
		image: Yup.string().nullable().optional(),
		eventDate: Yup.date().required(t('validationErrors.required.eventDate')),
		published: Yup.boolean(),
	});
