export const toMoscowISO = (datetimeLocal: string): string => {
	return new Date(datetimeLocal + '+03:00').toISOString();
};
