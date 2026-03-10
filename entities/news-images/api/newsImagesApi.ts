import { baseApi } from '@/shared/api';

export const newsImagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadNewsImage: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/news-images',
				method: 'POST',
				body: formData,
			}),
		}),

		deleteNewsImage: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: `/news-images`,
				method: 'DELETE',
				body: { url },
			}),
		}),
	}),
});

export const { useUploadNewsImageMutation, useDeleteNewsImageMutation } =
	newsImagesApi;
