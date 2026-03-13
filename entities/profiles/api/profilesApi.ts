import { baseApi } from '@/shared/api';

import { Profile } from '../model/types';

export const profileApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMyProfile: builder.query<Profile, void>({
			query: () => '/me/profile',
			providesTags: ['MyProfile'],
		}),
		getProfile: builder.query<Profile, string>({
			query: (userId) => `/profiles/${userId}`,
			providesTags: (result, error, userId) => [
				{ type: 'Profiles', id: userId },
				{ type: 'MyProfile', id: userId },
			],
		}),
		getAllProfiles: builder.query<
			{ profiles: Profile[]; total: number },
			{ page: number; query?: string; pageSize?: number }
		>({
			query: ({ page, query, pageSize = 4 }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				return `/profiles?${params.toString()}`;
			},
			providesTags: ['Profiles'],
		}),
		updateProfile: builder.mutation<Profile, Partial<Profile>>({
			query: (body) => ({
				url: '/me/profile',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Profiles', 'MyProfile'],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useGetAllProfilesQuery,
	useGetMyProfileQuery,
	useUpdateProfileMutation,
} = profileApi;
