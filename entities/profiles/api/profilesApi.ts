import { baseApi } from '@/shared/api';

import { Profile } from '../model/types';

export const profileApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query<Profile, void>({
			query: () => '/profile',
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

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
