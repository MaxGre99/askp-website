import * as Yup from 'yup';

export const productSchema = Yup.object({
	name: Yup.string().required('Обязательное поле'),
	description: Yup.string().required('Обязательное поле'),
	contentLink: Yup.string()
		.url('Некорректный URL')
		.required('Обязательное поле'),
	price: Yup.number().min(1, 'Минимум 1 ₽').required('Обязательное поле'),
	images: Yup.array().of(Yup.string()),
	published: Yup.boolean(),
});
