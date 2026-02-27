import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../model/userTypes';

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
	}),
});

export const { useGetUserQuery } = userApi;
