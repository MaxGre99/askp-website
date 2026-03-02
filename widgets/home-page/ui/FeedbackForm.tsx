import { Form, Formik, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { BaseButton } from '@/shared/ui/BaseButton';
import { FormField } from '@/shared/ui/FormField';

// Тип для значений формы (initialValues)
interface FormValues {
	name: string;
	phone?: string;
	email?: string;
	telegram?: string;
	whatsapp?: string;
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
		phone: Yup.string(),
		email: Yup.string().email(t('validationErrors.invalid.email')),
		telegram: Yup.string(),
		whatsapp: Yup.string(),
		message: Yup.string(),
	}).test(
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
	);

	// Расширенный тип для ошибок (включая кастомную 'contacts')
	interface ExtendedErrors extends Yup.InferType<typeof contactSchema> {
		contacts?: string;
	}

	// Интерфейс для пропсов компонента ContactError
	interface ContactErrorProps {
		className?: string; // Опциональный, для передачи дополнительных классов
	}

	// Компонент для отображения ошибки
	const ContactError = ({ className = '' }: ContactErrorProps) => {
		// Типизируем контекст на основе FormValues
		const { errors: formikErrors, submitCount } =
			useFormikContext<FormValues>();

		// Расширяем тип ошибок для доступа к 'contacts'
		const errors = formikErrors as unknown as ExtendedErrors;

		return submitCount > 0 && errors.contacts ? (
			<p className={`error text-center ${className}`}>{errors.contacts}</p>
		) : null;
	};

	return (
		<Formik<FormValues>
			initialValues={{
				name: '',
				phone: '',
				email: '',
				telegram: '',
				whatsapp: '',
				message: '',
			}}
			validationSchema={contactSchema}
			onSubmit={async (values, { resetForm }) => {
				const res = await fetch('/api/feedback', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ type, ...values }),
				});

				if (res.ok) {
					resetForm();
					alert(t('notifications.applicationSent'));
				} else {
					alert(t('notifications.applicationError'));
				}
			}}
		>
			<Form className='flex flex-col w-1/2 rounded-2xl backdrop-blur-2xl bg-white/80 p-6'>
				<FormField
					name='name'
					label={t('labels.firstName')}
					placeholder={t('placeholders.firstName')}
					required
				/>
				<div className='grid grid-cols-2 gap-4 mt-3'>
					<FormField
						name='phone'
						label={t('labels.phone')}
						type='tel'
						placeholder={t('placeholders.phone')}
						// highlightOnError='contacts'
					/>
					<FormField
						name='email'
						label={t('labels.email')}
						type='email'
						placeholder={t('placeholders.phone')}
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
				</div>
				<ContactError className='mt-2' />
				<div className='mt-3'>
					<FormField
						name='message'
						label={t('labels.problemDescription')}
						as='textarea'
						placeholder={t('placeholders.problemDescription')}
					/>
				</div>
				<BaseButton type='submit' className='font-bad-script text-2xl mt-5'>
					{t('buttons.send')}
				</BaseButton>
			</Form>
		</Formik>
	);
};
