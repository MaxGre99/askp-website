import { Form, Formik /* , useFormikContext */ } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { handleApiError } from '@/shared/lib/handleApiError';
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
	message?: string;
}

export const FeedbackForm = ({
	type,
}: {
	type: 'cooperation' | 'consultation';
}) => {
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
		message: Yup.string(),
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

	// // Интерфейс для пропсов компонента ContactError
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
				message: '',
			}}
			validationSchema={contactSchema}
			onSubmit={async (values, { resetForm }) => {
				try {
					const res = await fetch('/api/feedback', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ type, ...values }),
					});

					if (!res.ok) {
						const data = await res.json();
						// Используем тот же handleApiError но с нормализованной ошибкой
						handleApiError({ data });
						return;
					}

					resetForm();
					toast(t('notifications.feedbackSent'), { type: 'success' });
				} catch (err) {
					handleApiError(err);
				}
			}}
		>
			<Form className='flex flex-col w-1/2 rounded-2xl backdrop-blur-2xl bg-white/80 p-6'>
				<div className='grid grid-cols-2 gap-4'>
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
						// highlightOnError='contacts'
						required
					/>
					<FormField
						name='email'
						label={t('labels.email')}
						type='email'
						placeholder={t('placeholders.email')}
						// highlightOnError='contacts'
						required
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
				<div className='mt-4'>
					<FormField
						name='message'
						label={t('labels.message')}
						as='textarea'
						placeholder={t('placeholders.message')}
					/>
				</div>
				<Button type='submit' className='mt-6'>
					{t('buttons.send')}
				</Button>
			</Form>
		</Formik>
	);
};
