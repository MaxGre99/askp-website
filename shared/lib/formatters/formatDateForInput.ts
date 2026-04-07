export const formatDateForInput = (date: string | null | undefined) => {
	if (!date) return '';

	if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

	const d = new Date(date);
	if (isNaN(d.getTime())) return '';

	return d.toISOString().split('T')[0];
};
