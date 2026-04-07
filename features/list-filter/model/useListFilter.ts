'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { updateQuery } from '@/shared/lib/helpers';

const DEFAULT_PAGE_SIZE = 4;

export const useListFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get('page') ?? 1);
	const query = searchParams.get('query') ?? '';
	const pageSize = Number(searchParams.get('pageSize') ?? DEFAULT_PAGE_SIZE);

	const [draftQuery, setDraftQuery] = useState(query);

	// гарантируем page
	useEffect(() => {
		if (!searchParams.has('page')) {
			updateQuery(
				{ page: 1, pageSize: DEFAULT_PAGE_SIZE },
				searchParams,
				router,
				'replace',
			);
		}
	}, [searchParams, router]);

	useEffect(() => {
		setDraftQuery(query);
	}, [query]);

	const applyFilter = () => {
		updateQuery(
			{
				query: draftQuery || null,
				page: 1,
			},
			searchParams,
			router,
			'push',
		);
	};

	const changePage = (p: number) => {
		updateQuery({ page: p }, searchParams, router, 'push');
	};

	const changePageSize = (size: number) => {
		updateQuery(
			{
				pageSize: size,
				page: 1, // всегда сбрасываем страницу
			},
			searchParams,
			router,
			'push',
		);
	};

	return {
		page,
		query,
		pageSize,
		draftQuery,
		setDraftQuery,
		applyFilter,
		changePage,
		changePageSize,
	};
};
