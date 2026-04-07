import { Dispatch, SetStateAction } from 'react';

import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useResetPasswordMutation } from '@/entities/users';
import { handleApiError } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';

export const EmailToResetPassword = ({
	setShowMenu,
}: {
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
	const { t } = useTranslation();

	const [resetPassword] = useResetPasswordMutation();

	return (
		<Formik
			initialValues={{ email: '' }}
			onSubmit={async ({ email }) => {
				try {
					await resetPassword({ email }).unwrap();
					setShowMenu(false);
					toast.success(t('notifications.resetPasswordEmailSent'));
				} catch (err) {
					handleApiError(err);
				}
			}}
		>
			<Form className='flex flex-col gap-2'>
				<FormField name='email' label={t('labels.emailToResetPassword')} />

				<Button type='submit'>{t('buttons.send')}</Button>
			</Form>
		</Formik>
	);
};
