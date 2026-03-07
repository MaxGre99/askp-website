import { redirect, usePathname } from 'next/navigation';

import { useGetUserQuery } from '@/entities/users';

export const useRedirectForbidden = () => {
	const pathname = usePathname();
	const { data: user, isLoading } = useGetUserQuery();

	if (
		(pathname.includes('/account/news') ||
			pathname.includes('/account/applications') ||
			pathname.includes('/account/events')) &&
		!isLoading &&
		user?.role === 'USER'
	) {
		redirect('/account/profile');
	}
};
