import { Form,Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useSignInMutation } from '@/entities/users';
import { getApiErrorMessage } from '@/shared/api';
import { BaseButton } from '@/shared/ui/BaseButton';
import { FormField } from '@/shared/ui/FormField';

interface FormValues {
	email: string;
	password: string;
	rememberMe: boolean;
}

export const SignInForm = ({
	setShowMenu,
}: {
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { t } = useTranslation();
	const [signIn] = useSignInMutation();

	const validationSchema = Yup.object({
		email: Yup.string()
			.email(t('validationErrors.invalid.email'))
			.required(t('validationErrors.required.email')),
		password: Yup.string().required(t('validationErrors.required.password')),
		rememberMe: Yup.boolean(),
	});

	return (
		<Formik<FormValues>
			initialValues={{
				email: '',
				password: '',
				rememberMe: false,
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { setStatus }) => {
				try {
					await signIn(values).unwrap();
					setShowMenu(false);
				} catch (err) {
					setStatus(getApiErrorMessage(err));
				}
			}}
		>
			{({ isSubmitting, status, values, setFieldValue }) => (
				<Form className='flex flex-col gap-2'>
					<FormField
						name='email'
						label={t('labels.email')}
						type='email'
						placeholder='Email'
						required
					/>

					<FormField
						name='password'
						label={t('labels.password')}
						type='password'
						placeholder='Пароль'
						required
					/>

					<label className='flex items-center gap-2 text-sm'>
						<input
							type='checkbox'
							checked={values.rememberMe}
							onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
						/>
						{t('labels.rememberMe')}
					</label>

					{status && <p className='error'>{t(`backendErrors.${status}`)}</p>}

					<BaseButton type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Входим…' : t('buttons.signIn')}
					</BaseButton>
				</Form>
			)}
		</Formik>
	);
};
