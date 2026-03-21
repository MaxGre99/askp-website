import { User, userApi } from '@/entities/users';
import { baseApi } from '@/shared/api';

import { SignInDto, SignUpDto } from '../model/authTypes';

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMe: builder.query<User, void>({
			query: () => '/auth/me',
			providesTags: ['Me'],
		}),
		signUp: builder.mutation<User, SignUpDto>({
			query: (body) => ({
				url: '/auth/sign-up',
				method: 'POST',
				body,
			}),
		}),

		signIn: builder.mutation<{ ok: true }, SignInDto>({
			query: (body) => ({
				url: '/auth/sign-in',
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
				url: '/auth/sign-out',
				method: 'POST',
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(baseApi.util.resetApiState());
				} catch {}
			},
		}),
	}),
});

export const {
	useGetMeQuery,
	useSignUpMutation,
	useSignInMutation,
	useSignOutMutation,
} = authApi;
