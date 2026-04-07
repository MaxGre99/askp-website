import { baseApi } from '@/shared/api';

export const articleImagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadArticleImage: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/article-images',
				method: 'POST',
				body: formData,
			}),
		}),
		deleteArticleImage: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: `/article-images`,
				method: 'DELETE',
				body: { url },
			}),
		}),
		uploadArticleCover: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/article-covers',
				method: 'POST',
				body: formData,
			}),
		}),
		deleteArticleCover: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: `/article-covers`,
				method: 'DELETE',
				body: { url },
			}),
		}),
	}),
});

export const {
	useUploadArticleImageMutation,
	useDeleteArticleImageMutation,
	useUploadArticleCoverMutation,
	useDeleteArticleCoverMutation,
} = articleImagesApi;
