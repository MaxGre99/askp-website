import { baseApi } from '@/shared/api';

export const donaterCoversApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadDonaterCover: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/donater-covers',
				method: 'POST',
				body: formData,
			}),
		}),
		deleteDonaterCover: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: `/donater-covers`,
				method: 'DELETE',
				body: { url },
			}),
		}),
	}),
});

export const { useUploadDonaterCoverMutation, useDeleteDonaterCoverMutation } =
	donaterCoversApi;
