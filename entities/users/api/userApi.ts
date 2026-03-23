import { baseApi } from '@/shared/api';

import { FullUser, UserWithCreatedAt } from '../model/userTypes';

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query<FullUser[], void>({
			query: () => '/users',
			providesTags: ['Users'],
		}),
		getPendingUsers: builder.query<UserWithCreatedAt[], void>({
			query: () => '/users/pending',
			providesTags: ['Users'],
		}),

		getBlockedUsers: builder.query<UserWithCreatedAt[], void>({
			query: () => '/users/blocked',
			providesTags: ['Users'],
		}),

		approveUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/users/${id}/approve`,
				method: 'POST',
			}),
			invalidatesTags: ['Users'],
		}),

		rejectUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/users/${id}/reject`,
				method: 'POST',
			}),
			invalidatesTags: ['Users'],
		}),
		blockUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/users/${id}/block`,
				method: 'POST',
			}),
			invalidatesTags: ['Users'],
		}),
		unblockUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/users/${id}/unblock`,
				method: 'POST',
			}),
			invalidatesTags: ['Users'],
		}),
		setAdminUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/users/${id}/set-admin`,
				method: 'POST',
			}),
			invalidatesTags: ['Users'],
		}),
		setUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/users/${id}/set-user`,
				method: 'POST',
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useGetAllUsersQuery,
	useGetPendingUsersQuery,
	useGetBlockedUsersQuery,
	useApproveUserMutation,
	useBlockUserMutation,
	useRejectUserMutation,
	useSetAdminUserMutation,
	useUnblockUserMutation,
	useSetUserMutation,
} = userApi;
