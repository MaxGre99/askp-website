import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useCreateDonaterMutation } from '@/entities/donaters';
import { handleApiError } from '@/shared/lib/handleApiError';
import { trimStrings } from '@/shared/lib/trimStrings';

import { createDonaterSchema } from './schema';

export const useCreateDonaterForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const [createDonater] = useCreateDonaterMutation();

	const schema = createDonaterSchema(t);

	const initialValues = { name: '', description: '', image: '' };

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const trimmed = trimStrings(values);

			await createDonater({
				...trimmed,
				image: trimmed.image || null,
			}).unwrap();

			router.push('/donate');
		} catch (err) {
			handleApiError(err);
		}
	};

	return { initialValues, schema, handleSubmit };
};
