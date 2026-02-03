import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, RegisterDto, LoginDto } from './types/auth';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		credentials: 'include',
	}),
	tagTypes: ['Me'],
	endpoints: (builder) => ({
		me: builder.query<User, void>({
			query: () => '/me',
			providesTags: ['Me'],
		}),

		register: builder.mutation<User, RegisterDto>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
		}),

		logIn: builder.mutation<{ ok: true }, LoginDto>({
			query: (body) => ({
				url: '/auth/logIn',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Me'],
		}),

		logOut: builder.mutation<{ ok: true }, void>({
			query: () => ({
				url: '/auth/logOut',
				method: 'POST',
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(authApi.util.resetApiState());
				} catch {}
			},
		}),
	}),
});

export const {
	useMeQuery,
	useRegisterMutation,
	useLogInMutation,
	useLogOutMutation,
} = authApi;
