import { User, userApi } from '@/entities/users';
import { baseApi } from '@/shared/api';

import { SignInDto, SignUpDto } from '../model/authTypes';

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMe: builder.query<User | null, void>({
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

					// сразу убираем пользователя
					dispatch(
						authApi.util.updateQueryData('getMe', undefined, () => null),
					);
				} catch {}
			},
		}),

		resetPassword: builder.mutation<{ ok: true }, { email: string }>({
			query: ({ email }) => ({
				url: '/auth/reset-password',
				method: 'POST',
				body: { email },
			}),
		}),

		confirmPassword: builder.mutation<
			{ ok: true },
			{ token: string; password: string }
		>({
			query: ({ token, password }) => ({
				url: '/auth/reset-password/confirm',
				method: 'POST',
				body: { token, password },
			}),
		}),
	}),
});

export const {
	useGetMeQuery,
	useSignUpMutation,
	useSignInMutation,
	useSignOutMutation,
	useResetPasswordMutation,
	useConfirmPasswordMutation,
} = authApi;
