'use client';

import { ReactNode } from 'react';

import { useAccountGuard } from '@/shared/hooks/useAccountGuard';
import { AccountSidebar } from '@/widgets/account-sidebar';

const AccountLayout = ({ children }: { children: ReactNode }) => {
	const { isForbidden, isUnauthorized, isLoading } = useAccountGuard();

	// Не рендерим ничего пока проверяем или если нет доступа
	if (isLoading || isForbidden || isUnauthorized) return null;

	return (
		<div className='flex flex-1 gap-2 w-full'>
			<AccountSidebar />
			<div className='flex flex-1 max-w-[calc(100%-308px)] bg-white rounded-2xl p-6'>
				{children}
			</div>
		</div>
	);
};

export default AccountLayout;
