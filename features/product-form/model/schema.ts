import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const productSchema = (t: TFunction) =>
	Yup.object({
		name: Yup.string().required(t('validationErrors.required.name')),
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
		contentLink: Yup.string()
			.url(t('validationErrors.invalid.url'))
			.required(t('validationErrors.required.contentLink')),
		price: Yup.number()
			.min(1, t('validationErrors.min.price'))
			.required(t('validationErrors.required.price')),
		images: Yup.array().of(Yup.string()),
		published: Yup.boolean(),
	});
