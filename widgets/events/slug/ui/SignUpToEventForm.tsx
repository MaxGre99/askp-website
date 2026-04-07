import { Form, Formik /* , useFormikContext */ } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { handleApiError } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';

// Тип для значений формы (initialValues)
interface FormValues {
	name: string;
	phone: string;
	email: string;
	telegram?: string;
	whatsapp?: string;
	vk?: string;
}

export const SignUpToEventForm = ({ eventName }: { eventName: string }) => {
	const { t } = useTranslation();

	const contactSchema = Yup.object({
		name: Yup.string().required(t('validationErrors.required.firstName')),
		phone: Yup.string().required(t('validationErrors.required.phone')),
		email: Yup.string()
			.email(t('validationErrors.invalid.email'))
			.required(t('validationErrors.required.email')),
		telegram: Yup.string(),
		whatsapp: Yup.string(),
		vk: Yup.string().url(t('validationErrors.invalid.url')),
	}); /* .test(
		'one-contact-required',
		t('validationErrors.required.contact'),
		function (values) {
			const { phone, email, telegram, whatsapp } = values;

			if (phone || email || telegram || whatsapp) {
				return true;
			}

			return this.createError({
				path: 'contacts',
				message: t('validationErrors.required.contact'),
			});
		},
	); */

	// Расширенный тип для ошибок (включая кастомную 'contacts')
	// interface ExtendedErrors extends Yup.InferType<typeof contactSchema> {
	// 	contacts?: string;
	// }

	// Интерфейс для пропсов компонента ContactError
	// interface ContactErrorProps {
	// 	className?: string; // Опциональный, для передачи дополнительных классов
	// }

	// Компонент для отображения ошибки
	// const ContactError = ({ className = '' }: ContactErrorProps) => {
	// 	// Типизируем контекст на основе FormValues
	// 	const { errors: formikErrors, submitCount } =
	// 		useFormikContext<FormValues>();

	// 	// Расширяем тип ошибок для доступа к 'contacts'
	// 	const errors = formikErrors as unknown as ExtendedErrors;

	// 	return submitCount > 0 && errors.contacts ? (
	// 		<p className={`error text-center ${className}`}>{errors.contacts}</p>
	// 	) : null;
	// };

	return (
		<Formik<FormValues>
			initialValues={{
				name: '',
				phone: '',
				email: '',
				telegram: '',
				whatsapp: '',
				vk: '',
			}}
			validationSchema={contactSchema}
			onSubmit={async (values, { resetForm }) => {
				try {
					const res = await fetch('/api/sign-up-to-event', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ eventName, ...values }),
					});

					if (!res.ok) {
						const data = await res.json();
						handleApiError({ data });
						return;
					}

					resetForm();
					toast(t('notifications.signedUpToEvent'), { type: 'success' });
				} catch (err) {
					handleApiError(err);
				}
			}}
		>
			<Form className='flex flex-col w-full rounded-2xl backdrop-blur-2xl bg-blue-100/60 p-6 gap-6 md:w-[75%] lg:w-[60%] xl:w-1/2'>
				<h2 className='font-oswald text-center font-light'>
					{t('events.signUpForm')}
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<FormField
						name='name'
						label={t('labels.firstName')}
						placeholder={t('placeholders.firstName')}
						required
					/>
					<FormField
						name='phone'
						label={t('labels.phone')}
						type='tel'
						placeholder={t('placeholders.phone')}
						required
						// highlightOnError='contacts'
					/>
					<FormField
						name='email'
						label={t('labels.email')}
						type='email'
						placeholder={t('placeholders.email')}
						required
						// highlightOnError='contacts'
					/>
					<FormField
						name='telegram'
						label={t('labels.telegram')}
						placeholder={t('placeholders.telegram')}
						// highlightOnError='contacts'
					/>
					<FormField
						name='whatsapp'
						label={t('labels.whatsapp')}
						placeholder={t('placeholders.whatsapp')}
						// highlightOnError='contacts'
					/>
					<FormField
						name='vk'
						label={t('labels.vk')}
						placeholder={t('placeholders.vk')}
						// className='w-fit self-center'
						// labelClassname='w-fit self-center mt-3'
						// highlightOnError='contacts'
					/>
				</div>
				{/* <ContactError className='mt-2' /> */}
				<Button type='submit'>{t('buttons.send')}</Button>
			</Form>
		</Formik>
	);
};
