import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const createNewsSchema = (t: TFunction) =>
	Yup.object({
		title: Yup.string().required(t('validationErrors.required.title')),
		content: Yup.string().required(t('validationErrors.required.content')),
		image: Yup.string().url(t('validationErrors.invalidUrl')).nullable(),
		published: Yup.boolean(),
	});
