import { baseApi } from '@/shared/api';

export const avatarsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadAvatar: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/avatars',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Profiles', 'MyProfile'],
		}),
		getAvatar: builder.query<{ url: string | null }, string>({
			query: (userId) => `/avatars/${userId}`,
			providesTags: ['Profiles', 'MyProfile'],
		}),
		deleteAvatar: builder.mutation<{ ok: boolean }, string>({
			query: (userId) => ({
				url: `/avatars/${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Profiles', 'MyProfile'],
		}),
	}),
});

export const {
	useUploadAvatarMutation,
	useGetAvatarQuery,
	useDeleteAvatarMutation,
} = avatarsApi;
