import { baseApi } from '@/shared/api';

import { Profile } from '../model/types';

export const profileApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query<Profile, void>({
			query: () => '/profile',
			providesTags: ['Profiles'],
		}),
		getProfiles: builder.query<Profile[], void>({
			query: () => '/profiles',
			providesTags: ['Profiles'],
		}),
		updateProfile: builder.mutation<Profile, Partial<Profile>>({
			query: (body) => ({
				url: '/profile',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Profiles'],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useGetProfilesQuery,
	useUpdateProfileMutation,
} = profileApi;
