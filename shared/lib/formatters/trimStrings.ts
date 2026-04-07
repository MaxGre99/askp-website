export const trimStrings = <T extends object>(obj: T): T =>
	Object.fromEntries(
		Object.entries(obj).map(([k, v]) => [
			k,
			typeof v === 'string' ? v.trim() : v,
		]),
	) as T;
