import { baseApi } from '@/shared/api';

import { User } from '../model/userTypes';

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => '/me',
			providesTags: ['Me'],
		}),
	}),
});

export const { useGetUserQuery } = userApi;
