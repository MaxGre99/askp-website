import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignInDto, SignUpDto } from '../model/authTypes';
import { User, userApi } from '@/entities/users';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		credentials: 'include',
	}),
	endpoints: (builder) => ({
		signUp: builder.mutation<User, SignUpDto>({
			query: (body) => ({
				url: '/auth/signUp',
				method: 'POST',
				body,
			}),
		}),

		signIn: builder.mutation<{ ok: true }, SignInDto>({
			query: (body) => ({
				url: '/auth/signIn',
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(userApi.util.invalidateTags(['Me']));
				} catch {}
			},
		}),

		signOut: builder.mutation<{ ok: true }, void>({
			query: () => ({
				url: '/auth/signOut',
				method: 'POST',
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(userApi.util.resetApiState());
				} catch {}
			},
		}),
	}),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } =
	authApi;
