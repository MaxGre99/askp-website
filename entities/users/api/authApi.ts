import { User, userApi } from '@/entities/users';
import { baseApi } from '@/shared/api';

import { SignInDto, SignUpDto } from '../model/authTypes';

export const authApi = baseApi.injectEndpoints({
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
