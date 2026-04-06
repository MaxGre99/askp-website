'use client';

import { ReactNode } from 'react';

import { useAccountGuard } from '@/shared/hooks/useAccountGuard';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { Loader } from '@/shared/ui/Loader';
import {
	AccountSidebar,
	AccountSidebarSelect,
} from '@/widgets/account-sidebar';

const AccountLayout = ({ children }: { children: ReactNode }) => {
	const { isForbidden, isUnauthorized, isLoading } = useAccountGuard();
	const isMobile = useIsMobile(1024); // breakpoint 768 = md

	if (isLoading || isForbidden || isUnauthorized) return <Loader />;

	return (
		<div className='flex flex-col lg:flex-row flex-1 gap-2 w-full'>
			{isMobile ? (
				<>
					<AccountSidebarSelect />
					<div className='flex flex-1 bg-white rounded-2xl p-6 justify-center'>
						{children}
					</div>
				</>
			) : (
				<>
					<AccountSidebar />
					<div className='flex flex-1 max-w-[calc(100%-308px)] bg-white rounded-2xl p-6 justify-center'>
						{children}
					</div>
				</>
			)}
		</div>
	);
};

export default AccountLayout;
