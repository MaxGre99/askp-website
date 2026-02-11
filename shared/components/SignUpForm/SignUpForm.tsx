import { useSignUpMutation } from '@/shared/api/authApi';
import { SignUpFormValues } from '@/shared/schemas/signUp.schema';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { Form, Formik } from 'formik';
import { useState } from 'react';

import * as Yup from 'yup';
import FormField from '../FormField/FormField';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
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
			<p className='text-green-600 text-sm text-center'>
				{t('notifications.registerApplication')}
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
				bg-white/70 backdrop-blur-xl
				p-6 rounded-3xl shadow-lg
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
					<p className='text-sm text-red-500 text-center'>{apiError}</p>
				)}

				<button
					type='submit'
					disabled={isLoading}
					className='
						bg-cyan-500 text-white
						py-3 rounded-2xl font-medium
						transition
						hover:bg-cyan-600
						active:bg-cyan-400
						disabled:opacity-50
					'
				>
					{isLoading ? t('notifications.creating') : t('buttons.signUp')}
				</button>
			</Form>
		</Formik>
	);
};

export default SignUpForm;
