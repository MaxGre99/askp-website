export const formatForMoscowInput = (isoString?: string | null): string => {
	if (!isoString) return '';
	const date = new Date(isoString);
	const moscowOffset = 3 * 60;
	const localOffset = date.getTimezoneOffset();
	const shifted = new Date(
		date.getTime() + (moscowOffset + localOffset) * 60000,
	);

	const year = shifted.getFullYear();
	const month = String(shifted.getMonth() + 1).padStart(2, '0');
	const day = String(shifted.getDate()).padStart(2, '0');
	const hours = String(shifted.getHours()).padStart(2, '0');
	const minutes = String(shifted.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};
