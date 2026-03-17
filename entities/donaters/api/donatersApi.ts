import { baseApi } from '@/shared/api';

import { Donater } from '../model/types';

export const donatersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllDonaters: builder.query<{ donaters: Donater[] }, void>({
			query: () => '/donaters',
			providesTags: ['Donaters'],
		}),
		getDonater: builder.query<Donater, string>({
			query: (id) => `/donaters/${id}`,
			providesTags: (_r, _e, id) => [{ type: 'Donaters', id }],
		}),
		createDonater: builder.mutation<Donater, Partial<Donater>>({
			query: (body) => ({ url: '/donaters', method: 'POST', body }),
			invalidatesTags: ['Donaters'],
		}),
		updateDonater: builder.mutation<
			Donater,
			{ id: string; body: Partial<Donater> }
		>({
			query: ({ id, body }) => ({
				url: `/donaters/${id}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: (_r, _e, { id }) => [
				'Donaters',
				{ type: 'Donaters', id },
			],
		}),
		deleteDonater: builder.mutation<{ ok: boolean }, string>({
			query: (id) => ({ url: `/donaters/${id}`, method: 'DELETE' }),
			invalidatesTags: ['Donaters'],
		}),
	}),
});

export const {
	useGetAllDonatersQuery,
	useGetDonaterQuery,
	useCreateDonaterMutation,
	useUpdateDonaterMutation,
	useDeleteDonaterMutation,
} = donatersApi;
