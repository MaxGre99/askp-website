import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { News } from './types/news';

export const newsApi = createApi({
	reducerPath: 'newsApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/news' }),
	tagTypes: ['News'],
	endpoints: (builder) => ({
		getAllNews: builder.query<
			{ news: News[]; total: number },
			{ page: number; query?: string }
		>({
			query: ({ page, query }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				if (query) params.set('query', query);
				return `/?${params.toString()}`;
			},
			providesTags: ['News'],
		}),
		getNews: builder.query<News, string>({
			query: (slug) => `/${slug}`,
			providesTags: (result, error, slug) => [{ type: 'News', id: slug }],
		}),
		createNews: builder.mutation<News, Partial<News>>({
			query: (body) => ({ url: '/', method: 'POST', body }),
			invalidatesTags: ['News'],
		}),
		updateNews: builder.mutation<News, { slug: string; body: Partial<News> }>({
			query: ({ slug, body }) => ({ url: `/${slug}`, method: 'PATCH', body }),
			invalidatesTags: (result, error, { slug }) => [
				{ type: 'News', id: slug },
			],
		}),
		deleteNews: builder.mutation<{ ok: boolean }, string>({
			query: (slug) => ({ url: `/${slug}`, method: 'DELETE' }),
			invalidatesTags: ['News'],
		}),
	}),
});

export const {
	useGetAllNewsQuery,
	useGetNewsQuery,
	useCreateNewsMutation,
	useUpdateNewsMutation,
	useDeleteNewsMutation,
} = newsApi;
