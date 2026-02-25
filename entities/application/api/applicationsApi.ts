import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const applicationsApi = createApi({
	reducerPath: 'applicationsApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/applications' }),
	tagTypes: ['Applications'],
	endpoints: (builder) => ({
		getPendingApplications: builder.query<
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
			providesTags: ['Applications'],
		}),

		getBlockedApplications: builder.query<
			{
				id: string;
				email: string;
				firstName: string;
				lastName: string;
				createdAt: string;
			}[],
			void
		>({
			query: () => '/blocked',
			providesTags: ['Applications'],
		}),

		approveApplication: builder.mutation<void, string>({
			query: (id) => ({
				url: `/${id}/approve`,
				method: 'POST',
			}),
			invalidatesTags: ['Applications'],
		}),

		rejectApplication: builder.mutation<void, string>({
			query: (id) => ({
				url: `/${id}/reject`,
				method: 'POST',
			}),
			invalidatesTags: ['Applications'],
		}),
		blockApplication: builder.mutation<void, string>({
			query: (id) => ({
				url: `/${id}/block`,
				method: 'POST',
			}),
			invalidatesTags: ['Applications'],
		}),
		unblockApplication: builder.mutation<void, string>({
			query: (id) => ({
				url: `/${id}/unblock`,
				method: 'POST',
			}),
			invalidatesTags: ['Applications'],
		}),
	}),
});

export const {
	useGetPendingApplicationsQuery,
	useGetBlockedApplicationsQuery,
	useApproveApplicationMutation,
	useRejectApplicationMutation,
	useBlockApplicationMutation,
	useUnblockApplicationMutation,
} = applicationsApi;
