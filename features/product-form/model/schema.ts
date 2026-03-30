import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const productSchema = (t: TFunction) =>
	Yup.object({
		name: Yup.string().required('validationErrors.required.name'),
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
			.url('validationErrors.invalid.url')
			.required('validationErrors.required.contentLink'),
		price: Yup.number()
			.min(1, 'validationErrors.min.price')
			.required('validationErrors.required.price'),
		images: Yup.array().of(Yup.string()),
		published: Yup.boolean(),
	});
