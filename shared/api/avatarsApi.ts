import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const avatarsApi = createApi({
	reducerPath: 'avatarsApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: ['Avatar'],
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
