'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Pagination from '@/shared/components/Pagination/Pagination';
import updateQuery from '@/shared/utils/updateQuery';
import { useGetAllNewsQuery } from '@/shared/api/newsApi';
import { useTranslation } from 'react-i18next';
import EventCard from '@/shared/components/EventCard/EventCard';
import BaseButton from '@/shared/components/BaseButton/BaseButton';

const ITEMS_PER_PAGE = 4;

const Page = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const searchParams = useSearchParams();

	// query из URL
	const page = Number(searchParams.get('page') ?? 1);
	const query = searchParams.get('query') ?? '';

	// локальное состояние инпута
	const [draftQuery, setDraftQuery] = useState(query);

	const { data: news } = useGetAllNewsQuery({ page, query });

	// гарантируем ?page=1
	useEffect(() => {
		if (!searchParams.has('page')) {
			updateQuery({ page: 1 }, searchParams, router, 'replace');
		}
	}, [searchParams, router]);

	// гарантируем корректный query
	useEffect(() => {
		setDraftQuery(query);
	}, [query]);

	// фильтрация
	const filteredNews = useMemo(() => {
		return (
			news?.news.filter((item) =>
				item.title.toLowerCase().includes(query.toLowerCase()),
			) ?? []
		);
	}, [news, query]);

	// пагинация
	const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

	const paginatedNews = useMemo(() => {
		const start = (page - 1) * ITEMS_PER_PAGE;
		return filteredNews.slice(start, start + ITEMS_PER_PAGE);
	}, [filteredNews, page]);

	// хэндлеры
	const applyFilter = () => {
		updateQuery(
			{
				query: draftQuery || null,
				page: 1,
			},
			searchParams,
			router,
			'push', // КЛЮЧЕВО
		);
	};

	return (
		<div className='flex flex-1 w-full flex-col gap-6'>
			<div className='flex justify-between items-center gap-3'>
				<h1 className='font-bad-script text-white text-3xl'>
					{t('news.pageTitle')}
				</h1>

				<div className='flex gap-2 max-w-md w-full'>
					<input
						value={draftQuery}
						onChange={(e) => setDraftQuery(e.target.value)}
						placeholder={t('placeholders.titleFilter')}
						className='input flex-1'
					/>

					<BaseButton onClick={applyFilter}>{t('buttons.find')}</BaseButton>
				</div>
			</div>

			<div className='flex flex-col gap-4'>
				{paginatedNews.map((news, index) => (
					<EventCard event={news} key={news.slug} index={index} type='news' />
				))}
			</div>

			<Pagination
				currentPage={page}
				totalPages={totalPages}
				onPageChange={(p) =>
					updateQuery({ page: p }, searchParams, router, 'push')
				}
			/>
		</div>
	);
};

export default Page;
