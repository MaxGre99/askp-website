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
			<div className='flex flex-1 max-w-[calc(100%-308px)] bg-white rounded-2xl px-6 py-8'>
				{children}
			</div>
		</div>
	);
}
