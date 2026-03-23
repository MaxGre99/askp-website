import { baseApi } from '@/shared/api';

import { Article, CreateArticleDto, UpdateArticleDto } from '../model/types';

export const articlesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllArticles: builder.query<
			{ articles: Article[]; total: number },
			{ page: number; query?: string; pageSize?: number; showAll?: boolean }
		>({
			query: ({ page, query, pageSize = 4, showAll }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				if (showAll) params.set('showAll', 'true');
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
		createArticle: builder.mutation<Article, CreateArticleDto>({
			query: (body) => ({
				url: '/articles',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Articles', 'MyArticles'],
		}),
		updateArticle: builder.mutation<
			Article,
			{ slug: string; body: UpdateArticleDto }
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
		publishArticle: builder.mutation<Article, string>({
			query: (slug) => ({
				url: `/articles/${slug}`,
				method: 'PATCH',
				body: { published: true },
			}),
			invalidatesTags: (_result, _error, slug) => [
				'Articles',
				'MyArticles',
				{ type: 'Articles', id: slug },
				{ type: 'MyArticles', id: slug },
			],
		}),
		unpublishArticle: builder.mutation<Article, string>({
			query: (slug) => ({
				url: `/articles/${slug}`,
				method: 'PATCH',
				body: { published: false },
			}),
			invalidatesTags: (_result, _error, slug) => [
				'Articles',
				'MyArticles',
				{ type: 'Articles', id: slug },
				{ type: 'MyArticles', id: slug },
			],
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
	usePublishArticleMutation,
	useUnpublishArticleMutation,
} = articlesApi;
