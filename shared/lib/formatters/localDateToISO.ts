export const localDateToISO = (dateString: string): string => {
	const date = new Date(dateString);
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return date.toISOString();
};
