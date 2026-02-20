'use client';

import { useGetUserQuery } from '@/shared/api/userApi';
import Sidebar from '@/shared/components/Sidebar/Sidebar';
import { redirect } from 'next/navigation';

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: user, isLoading } = useGetUserQuery();
	if (!isLoading && !user) redirect('/');

	return (
		<div className='flex flex-1 gap-2 w-full'>
			<Sidebar />
			<div className='p-6 w-full'>{children}</div>
		</div>
	);
}
