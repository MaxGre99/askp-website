import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const createEventSchema = (t: TFunction) =>
	Yup.object({
		title: Yup.string().required(t('validationErrors.required.title')),
		description: Yup.string().required(
			t('validationErrors.required.description'),
		),
		image: Yup.string().nullable().optional(),
		eventDate: Yup.date().required('validationErrors.required.eventDate'),
		published: Yup.boolean(),
	});
