'use client';

import { useState } from 'react';

import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { BiShow, BiSolidHide } from 'react-icons/bi';
import * as Yup from 'yup';

import { useSignUpMutation } from '@/entities/users';
import { handleApiError } from '@/shared/lib/helpers';
import { SignUpFormValues } from '@/shared/schemas';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';

export const SignUpForm = () => {
	const { t } = useTranslation();

	const signUpYupSchema = Yup.object({
		email: Yup.string()
			.email(t('validationErrors.invalid.email'))
			.required(t('validationErrors.required.email')),

		password: Yup.string()
			.min(6, t('validationErrors.min.password'))
			.required(t('validationErrors.required.password')),

		firstName: Yup.string().required(t('validationErrors.required.firstName')),

		lastName: Yup.string().required(t('validationErrors.required.lastName')),
	});

	const [signUp, { isLoading }] = useSignUpMutation();
	const [success, setSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

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
					await signUp(values).unwrap();
					setSuccess(true);
				} catch (err) {
					handleApiError(err);
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
				<h2 className='text-2xl font-semibold text-center'>
					{t('labels.signUp')}
				</h2>

				<FormField<SignUpFormValues>
					name='email'
					label={t('labels.email')}
					type='email'
					placeholder={t('placeholders.email')}
					required
					autoComplete='email'
				/>

				<div className='relative'>
					<FormField<SignUpFormValues>
						name='password'
						label={t('labels.password')}
						type={showPassword ? 'text' : 'password'}
						placeholder={t('placeholders.password')}
						required
						autoComplete='new-password'
						className='pr-10'
					/>

					<Button
						title={
							showPassword
								? t('buttons.hidePassword')
								: t('buttons.showPassword')
						}
						variant='ghost'
						type='button'
						onClick={() => setShowPassword((p) => !p)}
						className='absolute right-3 top-[37px] text-sm text-gray-500! p-0!'
					>
						{showPassword ? <BiSolidHide size={16} /> : <BiShow size={16} />}
					</Button>
				</div>

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

				<Button type='submit' disabled={isLoading}>
					{isLoading ? t('buttons.creating') : t('buttons.signUp')}
				</Button>
			</Form>
		</Formik>
	);
};
