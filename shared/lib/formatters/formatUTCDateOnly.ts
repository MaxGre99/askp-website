export const formatUTCDateOnly = (
	date: string | Date | null | undefined,
): string => {
	if (!date) return '—';
	const d = new Date(date);
	if (isNaN(d.getTime())) return '—';
	return `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${d.getUTCFullYear()}`;
};
