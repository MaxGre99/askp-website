import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventsApi = createApi({
	reducerPath: 'eventsApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/events' }),
	tagTypes: ['Event'],
	endpoints: (builder) => ({
		getAllEvents: builder.query<Event[], void>({
			query: () => '/',
			providesTags: ['Event'],
		}),
		getEvent: builder.query<Event, string>({
			query: (slug) => `/${slug}`, // GET /api/events/:slug
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
