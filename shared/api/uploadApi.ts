import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const uploadApi = createApi({
	reducerPath: 'uploadApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
	}),
	endpoints: (builder) => ({
		uploadAvatar: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/upload/avatar',
				method: 'POST',
				body: formData,
			}),
		}),
	}),
});

export const { useUploadAvatarMutation } = uploadApi;
