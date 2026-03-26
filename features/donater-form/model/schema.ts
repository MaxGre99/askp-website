import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const createDonaterSchema = (t: TFunction) =>
	Yup.object({
		name: Yup.string().required(t('validationErrors.required.name')),
		description: Yup.string() /* .required(
            t('validationErrors.required.description'),
        ) */,
		image: Yup.string().nullable().optional(),
	});
