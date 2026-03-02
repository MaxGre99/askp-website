import { baseApi } from '@/shared/api';

export const applicationsApi = baseApi.injectEndpoints({
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
			query: () => '/admin/applications/pending',
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
			query: () => '/admin/applications/blocked',
			providesTags: ['Applications'],
		}),

		approveApplication: builder.mutation<void, string>({
			query: (id) => ({
				url: `/admin/applications/${id}/approve`,
				method: 'POST',
			}),
			invalidatesTags: ['Applications'],
		}),

		rejectApplication: builder.mutation<void, string>({
			query: (id) => ({
				url: `/admin/applications/${id}/reject`,
				method: 'POST',
			}),
			invalidatesTags: ['Applications'],
		}),
		blockApplication: builder.mutation<void, string>({
			query: (id) => ({
				url: `/admin/applications/${id}/block`,
				method: 'POST',
			}),
			invalidatesTags: ['Applications'],
		}),
		unblockApplication: builder.mutation<void, string>({
			query: (id) => ({
				url: `/admin/applications/${id}/unblock`,
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
