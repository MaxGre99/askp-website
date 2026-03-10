import { baseApi } from '@/shared/api';

import { NewsType } from '../model/types';

export const newsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllNews: builder.query<
			{ news: NewsType[]; total: number },
			{ page: number; query?: string; pageSize?: number }
		>({
			query: ({ page, query, pageSize = 4 }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				return `/news?${params.toString()}`;
			},
			providesTags: ['News'],
		}),
		getNews: builder.query<NewsType, string>({
			query: (slug) => `/news/${slug}`,
			providesTags: (result, error, slug) => [
				{ type: 'News', id: slug },
				{ type: 'MyNews', id: slug },
			],
		}),
		createNews: builder.mutation<NewsType, Partial<NewsType>>({
			query: (body) => ({ url: '/news', method: 'POST', body }),
			invalidatesTags: ['News', 'MyNews'],
		}),
		updateNews: builder.mutation<
			NewsType,
			{ slug: string; body: Partial<NewsType> }
		>({
			query: ({ slug, body }) => ({
				url: `/news/${slug}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: (result, error, { slug }) => [
				{ type: 'News', id: slug },
				{ type: 'MyNews', id: slug },
			],
		}),
		deleteNews: builder.mutation<{ ok: boolean }, string>({
			query: (slug) => ({ url: `/news/${slug}`, method: 'DELETE' }),
			invalidatesTags: ['News', 'MyNews'],
		}),
		getMyNews: builder.query<
			{ news: NewsType[]; total: number },
			{ page: number; query?: string; pageSize?: number }
		>({
			query: ({ page, query, pageSize = 4 }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				return `me/news?${params.toString()}`;
			},
			providesTags: ['MyNews'],
		}),
	}),
});

export const {
	useGetAllNewsQuery,
	useGetNewsQuery,
	useCreateNewsMutation,
	useUpdateNewsMutation,
	useDeleteNewsMutation,
	useGetMyNewsQuery,
} = newsApi;
