'use client';

import { ReactNode } from 'react';

import { EmailLink } from '@/shared/ui/EmailLink';
import { SignUpForm } from '@/widgets/sign-up-form';

const subItems: ReactNode[] = [
	'Текстовый документ «заявка» (скан или фотография).',
	'Документы государственного образца о высшем психологическом образовании, переподготовке. Справка из ВУЗа, если Вы являетесь студентом.',
	'Документы о курсах повышения квалификации; документы, подтверждающие опыт профессиональной деятельности (запись в трудовой книжке, удостоверение, справка, рекомендательное письмо).',
	'Для подтверждения опыта практической деятельности в письме можно указать ссылки на: личный сайт, социальные сети, на сайты с публикацией статей или методических материалов Вашего авторства.',
];

const steps: { text: ReactNode; sub?: ReactNode[] }[] = [
	{ text: 'Ознакомиться с Уставом АСКП.' },
	{ text: 'Ознакомиться с Этическим кодексом АСКП.' },
	{
		text: 'Ознакомиться с Приказом №3 о уровнях членства АСКП (определиться самостоятельно с уровнем членства).',
	},
	{
		text: (
			<>
				Заполнить заявку на вступление и отправить на почту <EmailLink /> пакет
				документов (Тема письма «Заявка на вступление в АСКП»):
			</>
		),
		sub: subItems,
	},
	{
		text: (
			<>
				В течении двух рабочих дней Вы получите информационное письмо от
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

const Page = () => {
	return (
		<div className='flex flex-1 w-full flex-col items-center justify-center gap-6'>
			<section className='bg-white rounded-2xl p-6 w-full max-w-5xl shadow-sm'>
				<h3 className='text-xl text-center font-bold mb-6'>
					Чек-лист: Вступление в АСКП
				</h3>

				<ol className='flex flex-col gap-4'>
					{steps.map((step, i) => (
						<li key={i} className='flex flex-col gap-3'>
							<div className='flex gap-4 items-center'>
								<span className='shrink-0 w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center leading-none'>
									{i + 1}
								</span>
								<p className='text-gray-700'>{step.text}</p>
							</div>

							{step.sub && (
								<ul className='flex flex-col gap-2 pl-11'>
									{step.sub.map((item, j) => (
										<li key={j} className='flex gap-3 items-start'>
											<span className='shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-2' />
											<p className='text-gray-600 text-sm leading-relaxed'>
												{item}
											</p>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ol>
			</section>

			<SignUpForm />
		</div>
	);
};

export default Page;
