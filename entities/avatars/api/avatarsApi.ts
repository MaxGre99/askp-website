import { baseApi } from '@/shared/api';

export const avatarsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadAvatar: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/avatars/upload',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Avatar'],
		}),
		getAvatar: builder.query<{ url: string | null }, string>({
			query: (userId) => `/avatars/${userId}`,
			providesTags: ['Avatar'],
		}),
		deleteAvatar: builder.mutation<{ ok: boolean }, string>({
			query: (userId) => ({
				url: `/avatars/${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Avatar'],
		}),
	}),
});

export const {
	useUploadAvatarMutation,
	useGetAvatarQuery,
	useDeleteAvatarMutation,
} = avatarsApi;
