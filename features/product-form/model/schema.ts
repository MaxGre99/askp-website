import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const productSchema = (t: TFunction) =>
	Yup.object({
		name: Yup.string().required('Обязательное поле'),
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
			.url('Некорректный URL')
			.required('Обязательное поле'),
		price: Yup.number().min(1, 'Минимум 1 ₽').required('Обязательное поле'),
		images: Yup.array().of(Yup.string()),
		published: Yup.boolean(),
	});
