const Page = () => {
	const cookiesData = [
		{
			name: 'askp-token',
			type: 'Необходимый',
			purpose:
				'Авторизация пользователя. Содержит зашифрованный токен сессии, позволяющий идентифицировать вошедшего пользователя без повторного ввода пароля.',
			storage: 'Cookie (httpOnly)',
			duration:
				'До 7 дней (при включённой опции «Запомнить меня») или до 24 часов',
			thirdParty: 'Нет — устанавливается только нашим сайтом',
		},
		{
			name: 'redirect_toast',
			type: 'Функциональный',
			purpose:
				'Временное хранение уведомления для отображения после перехода между страницами. Не содержит персональных данных.',
			storage: 'sessionStorage (удаляется при закрытии вкладки)',
			duration: 'Секунды — удаляется сразу после отображения уведомления',
			thirdParty: 'Нет',
		},
		{
			name: 'cookie_consent',
			type: 'Необходимый',
			purpose:
				'Хранит факт принятия настоящей политики cookie, чтобы не показывать баннер повторно.',
			storage: 'localStorage',
			duration: 'Бессрочно до очистки браузера',
			thirdParty: 'Нет',
		},
	];

	return (
		<div className='flex flex-col gap-6 p-6 bg-white rounded-2xl'>
			<h1 className='text-center self-center font-oswald font-light text-5xl'>
				Политика использования файлов Cookie
			</h1>

			<section className='flex flex-col gap-2'>
				<h3>Что такое файлы Cookie?</h3>
				<p className='text-gray-700'>
					Файлы cookie — это небольшие текстовые файлы, которые сохраняются в
					вашем браузере при посещении сайта. Мы также используем технологии
					localStorage и sessionStorage — аналогичные механизмы хранения данных
					в браузере.
				</p>
			</section>

			<section className='flex flex-col gap-2'>
				<h3>Какие данные мы храним и зачем?</h3>
				<p className='text-gray-700'>
					Наш сайт использует только технически необходимые данные. Мы не
					используем рекламные, аналитические или маркетинговые cookie сторонних
					сервисов.
				</p>

				<div className='overflow-x-auto mt-2'>
					<table className='w-full text-sm border-collapse'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='border border-gray-200 px-3 py-2 text-left'>
									Название
								</th>
								<th className='border border-gray-200 px-3 py-2 text-left'>
									Тип
								</th>
								<th className='border border-gray-200 px-3 py-2 text-left'>
									Цель
								</th>
								<th className='border border-gray-200 px-3 py-2 text-left'>
									Хранилище
								</th>
								<th className='border border-gray-200 px-3 py-2 text-left'>
									Срок
								</th>
								<th className='border border-gray-200 px-3 py-2 text-left'>
									Третьи лица
								</th>
							</tr>
						</thead>
						<tbody>
							{cookiesData.map((row) => (
								<tr key={row.name}>
									<td className='border border-gray-200 px-3 py-2 font-mono'>
										{row.name}
									</td>
									<td className='border border-gray-200 px-3 py-2'>
										{row.type}
									</td>
									<td className='border border-gray-200 px-3 py-2'>
										{row.purpose}
									</td>
									<td className='border border-gray-200 px-3 py-2'>
										{row.storage}
									</td>
									<td className='border border-gray-200 px-3 py-2'>
										{row.duration}
									</td>
									<td className='border border-gray-200 px-3 py-2'>
										{row.thirdParty}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className='flex flex-col gap-2'>
				<h3>Управление cookie</h3>
				<p className='text-gray-700'>
					Кука{' '}
					<code className='bg-blue-500 text-white py-1 px-2 rounded'>
						askp-token
					</code>{' '}
					является технически необходимой — без неё авторизация на сайте
					невозможна. Вы можете удалить её в настройках браузера, однако это
					приведёт к выходу из аккаунта.
				</p>
				<p className='text-gray-700'>
					Для управления cookie вы можете использовать настройки вашего
					браузера: Chrome → Настройки → Конфиденциальность, Firefox → Настройки
					→ Приватность.
				</p>
			</section>

			<section className='flex flex-col gap-2'>
				<h3>Контакты</h3>
				<p className='text-gray-700'>
					По вопросам обработки данных:{' '}
					<a
						href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
						className='text-blue-500 hover:text-blue-700 active:text-blue-700'
					>
						{process.env.NEXT_PUBLIC_CONTACT_EMAIL}
					</a>
				</p>
			</section>
		</div>
	);
};

export default Page;
