'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { toast } from 'react-toastify';

export const useRedirectToast = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const raw = sessionStorage.getItem('redirect_toast');
		if (!raw) return;

		sessionStorage.removeItem('redirect_toast');

		try {
			const { message, type } = JSON.parse(raw);
			toast[type as 'error' | 'info' | 'success' | 'warning'](message);
		} catch {}
	}, [pathname, searchParams]);
};
