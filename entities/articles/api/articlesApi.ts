import { baseApi } from '@/shared/api';

import { Article } from '../model/types';

export const articlesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllArticles: builder.query<
			{ articles: Article[]; total: number },
			{ page: number; query?: string; pageSize?: number }
		>({
			query: ({ page, query, pageSize = 4 }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				return `/articles?${params.toString()}`;
			},
			providesTags: ['Articles'],
		}),
		getArticle: builder.query<Article, string>({
			query: (slug) => `/articles/${slug}`,
			providesTags: (_result, _error, slug) => [
				{ type: 'Articles', id: slug },
				{ type: 'MyArticles', id: slug },
			],
		}),
		createArticle: builder.mutation<Article, Partial<Article>>({
			query: (body) => ({
				url: '/articles',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Articles', 'MyArticles'],
		}),
		updateArticle: builder.mutation<
			Article,
			{ slug: string; body: Partial<Article> }
		>({
			query: ({ slug, body }) => ({
				url: `/articles/${slug}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: (_result, _error, { slug }) => [
				'Articles',
				'MyArticles',
				{ type: 'Articles', id: slug },
				{ type: 'MyArticles', id: slug },
			],
		}),
		deleteArticle: builder.mutation<{ ok: boolean }, string>({
			query: (slug) => ({
				url: `/articles/${slug}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Articles', 'MyArticles'],
		}),
		getMyArticles: builder.query<
			{ articles: Article[]; total: number },
			{ page: number; query?: string; pageSize?: number }
		>({
			query: ({ page, query, pageSize = 4 }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				return `my/articles?${params.toString()}`;
			},
			providesTags: ['MyArticles'],
		}),
	}),
});

export const {
	useGetAllArticlesQuery,
	useGetArticleQuery,
	useCreateArticleMutation,
	useUpdateArticleMutation,
	useDeleteArticleMutation,
	useGetMyArticlesQuery,
} = articlesApi;
