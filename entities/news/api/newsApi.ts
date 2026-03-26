import { baseApi } from '@/shared/api';

import { CreateNewsDto, NewsType, UpdateNewsDto } from '../model/types';

export const newsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllNews: builder.query<
			{ news: NewsType[]; total: number },
			{
				page: number;
				query?: string;
				pageSize?: number;
				withAuthor?: boolean;
				showAll?: boolean;
			}
		>({
			query: ({ page, query, pageSize = 4, withAuthor, showAll }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				if (withAuthor) params.set('withAuthor', 'true');
				if (showAll) params.set('showAll', 'true');
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
		createNews: builder.mutation<NewsType, CreateNewsDto>({
			query: (body) => ({ url: '/news', method: 'POST', body }),
			invalidatesTags: ['News', 'MyNews'],
		}),
		updateNews: builder.mutation<
			NewsType,
			{ slug: string; body: UpdateNewsDto }
		>({
			query: ({ slug, body }) => ({
				url: `/news/${slug}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: (_result, _error, { slug }) => [
				'News',
				'MyNews',
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
				return `my/news?${params.toString()}`;
			},
			providesTags: ['MyNews'],
		}),
		publishNews: builder.mutation<NewsType, string>({
			query: (slug) => ({
				url: `/news/${slug}`,
				method: 'PATCH',
				body: { published: true },
			}),
			invalidatesTags: (_result, _error, slug) => [
				'News',
				'MyNews',
				{ type: 'News', id: slug },
				{ type: 'MyNews', id: slug },
			],
		}),
		unpublishNews: builder.mutation<NewsType, string>({
			query: (slug) => ({
				url: `/news/${slug}`,
				method: 'PATCH',
				body: { published: false },
			}),
			invalidatesTags: (_result, _error, slug) => [
				'News',
				'MyNews',
				{ type: 'News', id: slug },
				{ type: 'MyNews', id: slug },
			],
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
	usePublishNewsMutation,
	useUnpublishNewsMutation,
} = newsApi;
