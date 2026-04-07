'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useGetMeQuery } from '@/entities/users';

import { redirectWithToast } from '../../../shared/lib/helpers';

import { ADMIN_ROUTE_PATTERNS, ADMIN_ROUTES } from './consts';

export const useAccountGuard = () => {
	const { t } = useTranslation();

	const pathname = usePathname();
	const router = useRouter();
	const { data: user, isLoading } = useGetMeQuery();

	// Запоминаем — был ли юзер залогинен на предыдущем рендере
	const wasLoggedIn = useRef(false);

	useEffect(() => {
		if (!isLoading && user) wasLoggedIn.current = true;
	}, [isLoading, user]);

	const isForbidden =
		!isLoading &&
		!!user &&
		user.role === 'USER' &&
		(ADMIN_ROUTES.some((route) => pathname.startsWith(route)) ||
			ADMIN_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname)));

	const isUnauthorized = !isLoading && !user;

	useEffect(() => {
		if (isForbidden) {
			redirectWithToast(router, '/account/profile', t('errors.forbidden'));
		}

		if (isUnauthorized) {
			if (wasLoggedIn.current) {
				// Разлогинился на странице — тихий редирект
				router.replace('/');
			} else {
				// Зашёл незалогиненным — с тостом
				redirectWithToast(router, '/', t('errors.unauthorized'));
			}
		}
	}, [isForbidden, isUnauthorized, router, t]);

	return { isForbidden, isUnauthorized, isLoading };
};
