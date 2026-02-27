import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Event } from '../model/types';

export const eventsApi = createApi({
	reducerPath: 'eventsApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/events' }),
	tagTypes: ['Event'],
	endpoints: (builder) => ({
		getAllEvents: builder.query<
			{ events: Event[]; total: number },
			{ page: number; query?: string; pageSize?: number }
		>({
			query: ({ page, query, pageSize = 4 }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				return `/?${params.toString()}`;
			},
			providesTags: ['Event'],
		}),
		getEvent: builder.query<Event, string>({
			query: (slug) => `/${slug}`,
			providesTags: (result, error, slug) => [{ type: 'Event', id: slug }],
		}),
		createEvent: builder.mutation<Event, Partial<Event>>({
			query: (body) => ({
				url: '/',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Event'],
		}),
		updateEvent: builder.mutation<
			Event,
			{ slug: string; body: Partial<Event> }
		>({
			query: ({ slug, body }) => ({
				url: `/${slug}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: (result, error, { slug }) => [
				{ type: 'Event', id: slug },
			],
		}),
		deleteEvent: builder.mutation<{ ok: boolean }, string>({
			query: (slug) => ({
				url: `/${slug}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Event'],
		}),
	}),
});

export const {
	useGetAllEventsQuery,
	useGetEventQuery,
	useCreateEventMutation,
	useUpdateEventMutation,
	useDeleteEventMutation,
} = eventsApi;
