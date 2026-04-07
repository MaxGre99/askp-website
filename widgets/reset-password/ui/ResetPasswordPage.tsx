'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { BiShow, BiSolidHide } from 'react-icons/bi';
import * as Yup from 'yup';

import { useConfirmPasswordMutation } from '@/entities/users';
import { handleApiError, redirectWithToast } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';

export const ResetPasswordPage = () => {
	const { t } = useTranslation();

	const params = useSearchParams();

	const token = params.get('token');

	const router = useRouter();

	const schema = Yup.object({
		password: Yup.string()
			.min(6, t('validationErrors.min.password'))
			.required(t('validationErrors.required.password')),
		confirmPassword: Yup.string()
			.oneOf(
				[Yup.ref('password')],
				t('validationErrors.invalid.passwordsDontMatch'),
			)
			.required(t('validationErrors.required.confirmPassword')),
	});

	const [confirmPassword] = useConfirmPasswordMutation();

	const confirmResetPassword = async (token: string, password: string) => {
		try {
			await confirmPassword({ token, password }).unwrap();
		} catch (err) {
			handleApiError(err);
		}
	};

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	if (!token) {
		return <h2 className='text-white'>{t('errors.invalidLink')} :(</h2>;
	}

	return (
		<Formik
			initialValues={{ password: '', confirmPassword: '' }}
			validationSchema={schema}
			onSubmit={async (values) => {
				try {
					await confirmResetPassword(token, values.password);
					redirectWithToast(
						router,
						'/',
						t('notifications.passwordResetSuccess'),
						'success',
					);
				} catch (err) {
					handleApiError(err);
				}
			}}
		>
			<Form
				className='
				flex flex-col gap-4
				w-full max-w-xs
				bg-white/80 backdrop-blur-2xl
				p-6 rounded-2xl shadow-lg
			'
			>
				<div className='relative'>
					<FormField
						name='password'
						type={showPassword ? 'text' : 'password'}
						label={t('labels.newPassword')}
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
				<div className='relative'>
					<FormField
						name='confirmPassword'
						type={showConfirmPassword ? 'text' : 'password'}
						label={t('labels.repeatPassword')}
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
						onClick={() => setShowConfirmPassword((p) => !p)}
						className='absolute right-3 top-[37px] text-sm text-gray-500! p-0!'
					>
						{showConfirmPassword ? (
							<BiSolidHide size={16} />
						) : (
							<BiShow size={16} />
						)}
					</Button>
				</div>

				<Button type='submit'>{t('buttons.resetPassword')}</Button>
			</Form>
		</Formik>
	);
};
