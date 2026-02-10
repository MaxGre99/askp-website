import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const applicationsApi = createApi({
	reducerPath: 'applicationsApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/users' }),
	tagTypes: ['UsersApplications'],
	endpoints: (builder) => ({
		getPendingUsers: builder.query<
			{
				id: string;
				email: string;
				firstName: string;
				lastName: string;
				createdAt: string;
			}[],
			void
		>({
			query: () => '/pending',
			providesTags: ['UsersApplications'],
		}),

		approveUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/${id}/approve`,
				method: 'POST',
			}),
			invalidatesTags: ['UsersApplications'],
		}),

		rejectUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/${id}/reject`,
				method: 'POST',
			}),
			invalidatesTags: ['UsersApplications'],
		}),
		blockUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/${id}/reject`,
				method: 'POST',
			}),
			invalidatesTags: ['UsersApplications'],
		}),
	}),
});

export const {
	useGetPendingUsersQuery,
	useApproveUserMutation,
	useRejectUserMutation,
	useBlockUserMutation,
} = applicationsApi;
