import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const createArticleSchema = (t: TFunction) =>
	Yup.object({
		title: Yup.string().required(t('validationErrors.required.title')),
		content: Yup.string().required(t('validationErrors.required.description')),
		image: Yup.string().nullable().optional(),
		published: Yup.boolean(),
	});
