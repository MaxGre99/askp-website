import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const redirectWithToast = (
	router: AppRouterInstance,
	path: string,
	message: string,
	type: 'error' | 'info' | 'success' = 'error',
) => {
	sessionStorage.setItem('redirect_toast', JSON.stringify({ message, type }));
	router.replace(path);
};
