'use client';

import {
	useApproveUserMutation,
	useGetPendingUsersQuery,
	useRejectUserMutation,
} from '@/shared/api/applicationsApi';
import Sidebar from '@/shared/components/Sidebar/Sidebar';

const Page = () => {
	const { data, isLoading } = useGetPendingUsersQuery();
	const [approveUser] = useApproveUserMutation();
	const [rejectUser] = useRejectUserMutation();

	return (
		<div className='flex w-full h-full'>
			<Sidebar />

			<div className='p-6 w-full'>
				<h1 className='text-xl font-semibold mb-4'>Заявки на регистрацию</h1>

				{isLoading && <p>Загрузка…</p>}

				{!isLoading && (!data || data.length === 0) && (
					<p className='text-gray-500'>Нет заявок</p>
				)}

				{data && data.length > 0 && (
					<table className='w-full border'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='border px-2 py-1'>Email</th>
								<th className='border px-2 py-1'>Имя</th>
								<th className='border px-2 py-1'>Фамилия</th>
								<th className='border px-2 py-1'>Дата</th>
								<th className='border px-2 py-1'>Действия</th>
							</tr>
						</thead>
						<tbody>
							{data.map((u) => (
								<tr key={u.id}>
									<td className='border px-2 py-1'>{u.email}</td>
									<td className='border px-2 py-1'>{u.firstName}</td>
									<td className='border px-2 py-1'>{u.lastName}</td>
									<td className='border px-2 py-1'>
										{new Date(u.createdAt).toLocaleDateString()}
									</td>
									<td className='border px-2 py-1 flex gap-2'>
										<button
											onClick={() => approveUser(u.id)}
											className='bg-green-500 text-white px-2 py-1 rounded'
										>
											Принять
										</button>
										<button
											onClick={() => rejectUser(u.id)}
											className='bg-red-500 text-white px-2 py-1 rounded'
										>
											Отклонить
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default Page;
