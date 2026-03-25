import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useGetMeQuery } from '@/entities/users';

import { redirectWithToast } from '../lib/redirectWithToast';

const ADMIN_ROUTES = [
	'/account/news',
	'/account/applications',
	'/account/events',
	'/donate/add',
	'/donate/edit',
];

export const useAccountGuard = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { data: user, isLoading } = useGetMeQuery();

	const isForbidden =
		!isLoading &&
		!!user &&
		user.role === 'USER' &&
		ADMIN_ROUTES.some((route) => pathname.startsWith(route));

	const isUnauthorized = !isLoading && !user;

	useEffect(() => {
		if (isForbidden) {
			redirectWithToast(
				router,
				'/account/profile',
				'Недостаточно прав доступа',
			);
		}
		if (isUnauthorized) {
			redirectWithToast(router, '/', 'Сначала необходимо авторизоваться');
		}
	}, [isForbidden, isUnauthorized, router]);

	return { isForbidden, isUnauthorized, isLoading };
};
