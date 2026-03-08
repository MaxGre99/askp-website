import { baseApi } from '@/shared/api';

export const profileBioImagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadProfileBioImage: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/profile-bio-images/upload',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['ProfileBioImages'],
		}),
		deleteProfileBioImage: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: `/profile-bio-images/delete`,
				method: 'DELETE',
				body: { url },
			}),
			invalidatesTags: ['ProfileBioImages'],
		}),
	}),
});

export const {
	useUploadProfileBioImageMutation,
	useDeleteProfileBioImageMutation,
} = profileBioImagesApi;
