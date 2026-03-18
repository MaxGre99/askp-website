import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useCreateDonaterMutation } from '@/entities/donaters';
import { trimStrings } from '@/shared/lib/trimStrings';

export const useCreateDonaterForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const [createDonater] = useCreateDonaterMutation();

	const schema = Yup.object({
		name: Yup.string().required(t('validationErrors.required.name')),
		description: Yup.string().required(
			t('validationErrors.required.description'),
		),
		image: Yup.string().nullable().optional(),
	});

	const initialValues = { name: '', description: '', image: '' };

	const handleSubmit = async (values: typeof initialValues) => {
		const trimmed = trimStrings(values);

		await createDonater({ ...trimmed, image: trimmed.image || null }).unwrap();

		router.push('/donate');
	};

	return { initialValues, schema, handleSubmit };
};
