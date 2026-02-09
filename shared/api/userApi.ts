import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './types/user';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		credentials: 'include',
	}),
	tagTypes: ['Me'],
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => '/me',
			providesTags: ['Me'],
		}),
		updateAvatar: builder.mutation<
			{ user: { avatar: string } },
			{ avatar: string }
		>({
			query: (body) => ({
				url: '/me/avatar',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Me'],
		}),
	}),
});

export const { useGetUserQuery, useUpdateAvatarMutation } = userApi;
