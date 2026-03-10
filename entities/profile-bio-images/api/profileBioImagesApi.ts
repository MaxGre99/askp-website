import { baseApi } from '@/shared/api';

export const profileBioImagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadProfileBioImage: builder.mutation<{ url: string }, FormData>({
			query: (formData) => ({
				url: '/profile-bio-images',
				method: 'POST',
				body: formData,
			}),
		}),
		deleteProfileBioImage: builder.mutation<{ ok: boolean }, string>({
			query: (url) => ({
				url: `/profile-bio-images`,
				method: 'DELETE',
				body: { url },
			}),
		}),
	}),
});

export const {
	useUploadProfileBioImageMutation,
	useDeleteProfileBioImageMutation,
} = profileBioImagesApi;
