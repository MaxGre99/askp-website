import { ReactNode } from 'react';

import { EmailLink } from '@/shared/ui/EmailLink';

const subItems: ReactNode[] = [
	'Текстовый документ «заявка» (скан или фотография).',
	'Документы государственного образца о высшем психологическом образовании, переподготовке. Справка из ВУЗа, если Вы являетесь студентом.',
	'Документы о курсах повышения квалификации; документы, подтверждающие опыт профессиональной деятельности (запись в трудовой книжке, удостоверение, справка, рекомендательное письмо).',
	'Для подтверждения опыта практической деятельности в письме можно указать ссылки на: личный сайт, социальные сети, на сайты с публикацией статей или методических материалов Вашего авторства.',
];

export const steps: { text: ReactNode; sub?: ReactNode[] }[] = [
	{
		text: (
			<>
				Ознакомиться с{' '}
				<a
					href='http://localhost:9000/documents/Ustav_ASKP.pdf'
					target='_blank'
					className='text-blue-500 hover:underline'
				>
					Уставом АСКП
				</a>
				.
			</>
		),
	},
	{
		text: (
			<>
				Ознакомиться с{' '}
				<a
					href='http://localhost:9000/documents/Etitcheskiy_kodex_ASKP.pdf'
					target='_blank'
					className='text-blue-500 hover:underline'
				>
					Этическим кодексом АСКП
				</a>
				.
			</>
		),
	},
	{
		text: (
			<>
				Ознакомиться с{' '}
				<a
					href='http://localhost:9000/documents/PRIKAZ_3_urovni_Chlenstva.pdf'
					target='_blank'
					className='text-blue-500 hover:underline'
				>
					Приказом №3 о уровнях членства АСКП
				</a>{' '}
				(определиться самостоятельно с уровнем членства).
			</>
		),
	},
	{
		text: (
			<>
				Заполнить{' '}
				<a
					href='http://localhost:9000/documents/Zayavlenie_na_vstuplenie_ASKP.pdf'
					target='_blank'
					className='text-blue-500 hover:underline'
				>
					заявку на вступление
				</a>{' '}
				и отправить на почту <EmailLink /> пакет документов (Тема письма «Заявка
				на вступление в АСКП»):
			</>
		),
		sub: subItems,
	},
	{
		text: (
			<>
				В течении двух рабочих дней Вы получите информационное письмо от{' '}
				<EmailLink />. Возможная дата собеседования, реквизиты для оплаты
				вступительного (единоразового) и членского взноса.
			</>
		),
	},
	{
		text: (
			<>
				Производите оплату и направляете чек на почту Ассоциации <EmailLink />.
			</>
		),
	},
];
