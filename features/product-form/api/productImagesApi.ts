import { baseApi } from '@/shared/api';

export const productImagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadProductImage: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/product-images',
				method: 'POST',
				body: formData,
			}),
		}),
		deleteProductImage: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: '/product-images',
				method: 'DELETE',
				body: { url },
			}),
		}),
		uploadProductCover: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/product-covers',
				method: 'POST',
				body: formData,
			}),
		}),
		deleteProductCover: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: '/product-covers',
				method: 'DELETE',
				body: { url },
			}),
		}),
	}),
});

export const {
	useUploadProductImageMutation,
	useDeleteProductImageMutation,
	useUploadProductCoverMutation,
	useDeleteProductCoverMutation,
} = productImagesApi;
