export const formatDateForInput = (date: string | null | undefined) => {
	if (!date) return '';
	if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

	const d = new Date(date);
	if (isNaN(d.getTime())) return '';

	// Берём UTC дату, не локальную
	const year = d.getUTCFullYear();
	const month = String(d.getUTCMonth() + 1).padStart(2, '0');
	const day = String(d.getUTCDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};
