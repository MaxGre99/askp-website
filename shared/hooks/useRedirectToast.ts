'use client';

import { useEffect } from 'react';

import { toast } from 'react-toastify';

export const useRedirectToast = () => {
	useEffect(() => {
		const raw = sessionStorage.getItem('redirect_toast');
		if (!raw) return;
		sessionStorage.removeItem('redirect_toast');
		try {
			const { message, type } = JSON.parse(raw);
			toast[type as 'error' | 'info' | 'success'](message);
		} catch {}
	}, []);
};
