import { baseApi } from '@/shared/api';

export const eventImagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadEventImage: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/event-images',
				method: 'POST',
				body: formData,
			}),
		}),
		deleteEventImage: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: `/event-images`,
				method: 'DELETE',
				body: { url },
			}),
		}),
		uploadEventCover: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/event-covers',
				method: 'POST',
				body: formData,
			}),
		}),
		deleteEventCover: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: `/event-covers`,
				method: 'DELETE',
				body: { url },
			}),
		}),
	}),
});

export const {
	useUploadEventImageMutation,
	useDeleteEventImageMutation,
	useUploadEventCoverMutation,
	useDeleteEventCoverMutation,
} = eventImagesApi;
