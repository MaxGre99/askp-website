import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const editProfileSchema = (t: TFunction) =>
	Yup.object({
		firstName: Yup.string().required(t('validationErrors.required.firstName')),
		lastName: Yup.string().required(t('validationErrors.required.lastName')),
		middleName: Yup.string().nullable(),
		displayName: Yup.string().nullable(),
		gender: Yup.string().oneOf(['MALE', 'FEMALE', 'OTHER']).nullable(),
		maritalStatus: Yup.string()
			.oneOf(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'])
			.nullable(),
		languages: Yup.array().of(Yup.string()).nullable(),
		birthDate: Yup.date().nullable(),
		shortBio: Yup.string().max(500).nullable(),
		fullBio: Yup.string().nullable(),
	});
