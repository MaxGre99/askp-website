import { Form, Formik } from 'formik';
import { useState } from 'react';

import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FormField } from '@/shared/ui/FormField';
import { BaseButton } from '@/shared/ui/BaseButton';
import { getApiErrorMessage } from '@/shared/api';
import { SignUpFormValues } from '@/shared/schemas';
import { useSignUpMutation } from '@/entities/users';

export const SignUpForm = () => {
	const { t } = useTranslation();

	const signUpYupSchema = Yup.object({
		email: Yup.string()
			.email(t('validationErrors.invalid.email'))
			.required(t('validationErrors.required.email')),

		password: Yup.string()
			.min(6, t('validationErrors.invalid.password'))
			.required(t('validationErrors.required.password')),

		firstName: Yup.string().required(t('validationErrors.required.firstName')),

		lastName: Yup.string().required(t('validationErrors.required.lastName')),
	});

	const [signUp, { isLoading }] = useSignUpMutation();
	const [success, setSuccess] = useState(false);
	const [apiError, setApiError] = useState('');

	if (success) {
		return (
			<p className='text-white text-lg text-center'>
				{t('notifications.applicationSuccess')}
			</p>
		);
	}

	return (
		<Formik<SignUpFormValues>
			initialValues={{
				email: '',
				password: '',
				firstName: '',
				lastName: '',
			}}
			validationSchema={signUpYupSchema}
			onSubmit={async (values) => {
				try {
					setApiError('');
					await signUp(values).unwrap();
					setSuccess(true);
				} catch (err) {
					setSuccess(false);
					setApiError(getApiErrorMessage(err));
				}
			}}
		>
			<Form
				className='
				flex flex-col gap-4
				w-full max-w-lg
				bg-white/80 backdrop-blur-2xl
				p-6 rounded-2xl shadow-lg
			'
			>
				<h2 className='text-2xl font-semibold text-center'>Регистрация</h2>

				<FormField<SignUpFormValues>
					name='email'
					label={t('labels.email')}
					type='email'
					placeholder={t('placeholders.email')}
					required
				/>

				<FormField<SignUpFormValues>
					name='password'
					label={t('labels.password')}
					type='password'
					placeholder={t('placeholders.password')}
					required
				/>

				<div className='grid grid-cols-2 gap-4'>
					<FormField<SignUpFormValues>
						name='firstName'
						label={t('labels.firstName')}
						placeholder={t('placeholders.firstName')}
						required
					/>

					<FormField<SignUpFormValues>
						name='lastName'
						label={t('labels.lastName')}
						placeholder={t('placeholders.lastName')}
						required
					/>
				</div>

				{apiError && (
					<p className='error text-center'>{t(`backendErrors.${apiError}`)}</p>
				)}

				<BaseButton type='submit' disabled={isLoading}>
					{isLoading ? t('notifications.creating') : t('buttons.signUp')}
				</BaseButton>
			</Form>
		</Formik>
	);
};
