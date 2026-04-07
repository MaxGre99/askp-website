import i18n from 'i18next';
import { toast } from 'react-toastify';

import { getApiErrorMessage } from './getApiErrorMessage';

export const handleApiError = (err: unknown) => {
	const code = getApiErrorMessage(err);
	const key = `backendErrors.${code}`;
	const message = i18n.exists(key) ? i18n.t(key) : code.replace(/_/g, ' ');
	toast.error(message, { toastId: code }); // toastId предотвращает дубли
	console.error('[API Error]', code, err);
};
