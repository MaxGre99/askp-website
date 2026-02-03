import { ReadonlyURLSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type UpdateMode = 'push' | 'replace';

const updateQuery = (
	params: Record<string, string | number | null>,
	searchParams: ReadonlyURLSearchParams,
	router: AppRouterInstance,
	mode: UpdateMode = 'push',
) => {
	const current = new URLSearchParams(searchParams.toString());

	Object.entries(params).forEach(([key, value]) => {
		if (value === null || value === '') {
			current.delete(key);
		} else {
			current.set(key, String(value));
		}
	});

	const url = `?${current.toString()}`;

	if (mode === 'replace') {
		router.replace(url, { scroll: false });
	} else {
		router.push(url, { scroll: false });
	}
};

export default updateQuery;
