/* eslint-disable @typescript-eslint/no-explicit-any */
export const getApiErrorMessage = (err: unknown): string => {
	if (err && typeof err === 'object') {
		if ('data' in err && (err.data as any)?.error)
			return (err.data as any).error;
		if ('message' in err) return (err as any).message;
	}
	return 'Неизвестная ошибка';
};
