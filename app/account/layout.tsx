'use client';

import { redirect } from 'next/navigation';

import { useGetUserQuery } from '@/entities/users';
import { useRedirectForbidden } from '@/shared/routing/useRedirectForbidden';
import { AccountSidebar } from '@/widgets/account-sidebar';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
	const { data: user, isLoading } = useGetUserQuery();
	if (!isLoading && !user) redirect('/');
	useRedirectForbidden();

	return (
		<div className='flex flex-1 gap-2 w-full'>
			<AccountSidebar />
			<div className='flex flex-1 max-w-[calc(100%-308px)] bg-white rounded-2xl px-6 py-8'>
				{children}
			</div>
		</div>
	);
};

export default AccountLayout;
