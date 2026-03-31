import { Dispatch, SetStateAction, useState } from 'react';

import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { BiShow, BiSolidHide } from 'react-icons/bi';
import * as Yup from 'yup';

import { useSignInMutation } from '@/entities/users';
import { handleApiError } from '@/shared/lib/handleApiError';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';

interface FormValues {
	email: string;
	password: string;
	rememberMe: boolean;
}

export const SignInForm = ({
	setShowMenu,
}: {
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
	const { t } = useTranslation();

	const [showPassword, setShowPassword] = useState(false);

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
			onSubmit={async (values) => {
				try {
					await signIn(values).unwrap();
					setShowMenu(false);
				} catch (err) {
					handleApiError(err);
				}
			}}
		>
			{({ isSubmitting, values, setFieldValue }) => (
				<Form className='flex flex-col gap-2'>
					<FormField
						name='email'
						label={t('labels.email')}
						type='email'
						placeholder='Email'
						required
						autoComplete='email'
					/>

					<div className='relative'>
						<FormField
							name='password'
							label={t('labels.password')}
							type={showPassword ? 'text' : 'password'}
							placeholder={t('placeholders.password')}
							required
							autoComplete='current-password'
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

					<label className='flex items-center gap-2 text-sm'>
						<input
							type='checkbox'
							checked={values.rememberMe}
							onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
						/>
						{t('labels.rememberMe')}
					</label>

					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? t('buttons.entering') : t('buttons.signIn')}
					</Button>
				</Form>
			)}
		</Formik>
	);
};
