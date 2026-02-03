import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import FormField from '../FormField/FormField';

// Тип для значений формы (initialValues)
interface FormValues {
	name: string;
	phone?: string;
	email?: string;
	telegram?: string;
	whatsapp?: string;
	message?: string;
}

// Расширенный тип для ошибок (включая кастомную 'contacts')
interface ExtendedErrors extends Yup.InferType<typeof contactSchema> {
	contacts?: string;
}

// Схема валидации (Yup выведет типы ошибок на основе FormValues, плюс кастомная 'contacts')
const contactSchema = Yup.object({
	name: Yup.string().required('Введите имя'),
	phone: Yup.string(),
	email: Yup.string().email('Некорректный email'),
	telegram: Yup.string(),
	whatsapp: Yup.string(),
	message: Yup.string(),
}).test(
	'one-contact-required',
	'Укажите хотя бы один способ связи',
	function (values) {
		// values типизируется автоматически как InferType схемы (все поля optional кроме name)
		const { phone, email, telegram, whatsapp } = values;

		if (phone || email || telegram || whatsapp) {
			return true;
		}

		return this.createError({
			path: 'contacts',
			message: 'Укажите хотя бы один способ связи',
		});
	},
);

// Интерфейс для пропсов компонента ContactError
interface ContactErrorProps {
	className?: string; // Опциональный, для передачи дополнительных классов
}

// Компонент для отображения ошибки
const ContactError = ({ className = '' }: ContactErrorProps) => {
	// Типизируем контекст на основе FormValues
	const { errors: formikErrors, submitCount } = useFormikContext<FormValues>();

	// Расширяем тип ошибок для доступа к 'contacts'
	const errors = formikErrors as unknown as ExtendedErrors;

	return submitCount > 0 && errors.contacts ? (
		<p className={`error text-center ${className}`}>{errors.contacts}</p>
	) : null;
};

const FeedbackForm = ({ type }: { type: 'cooperation' | 'consultation' }) => {
	return (
		<Formik<FormValues> // Типизируем Formik для лучшей безопасности
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
					alert('Заявка отправлена!');
				} else {
					alert('Ошибка отправки');
				}
			}}
		>
			<Form className='flex flex-col w-1/2 rounded-3xl backdrop-blur-2xl bg-white/60 p-6'>
				<FormField
					name='name'
					label='Имя'
					placeholder='Введите ваше имя'
					required
				/>
				<div className='grid grid-cols-2 gap-4 mt-3'>
					<FormField
						name='phone'
						label='Телефон'
						type='tel'
						placeholder='+7 (___) ___-__-__'
						highlightOnError='contacts'
					/>
					<FormField
						name='email'
						label='Email'
						type='email'
						placeholder='example@mail.com'
						highlightOnError='contacts'
					/>
					<FormField
						name='telegram'
						label='Telegram'
						placeholder='@username'
						highlightOnError='contacts'
					/>
					<FormField
						name='whatsapp'
						label='WhatsApp'
						placeholder='+7 (___) ___-__-__'
						highlightOnError='contacts'
					/>
				</div>
				<ContactError className='mt-2' />
				<div className='mt-3'>
					<FormField
						name='message'
						label='Описание проблемы'
						as='textarea'
						placeholder='Опишите вашу ситуацию (необязательно)'
					/>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white py-3 rounded-2xl font-bad-script text-2xl mt-3 hover:bg-blue-600 active:bg-blue-400'
				>
					Отправить
				</button>
			</Form>
		</Formik>
	);
};

export default FeedbackForm;
