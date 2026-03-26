import { baseApi } from '@/shared/api';

import { CreateEventDto, EventType, UpdateEventDto } from '../model/types';

export const eventsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllEvents: builder.query<
			{ events: EventType[]; total: number },
			{
				page: number;
				query?: string;
				pageSize?: number;
				withAuthor?: boolean;
				showAll?: boolean;
			}
		>({
			query: ({ page, query, pageSize = 4, withAuthor, showAll }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				if (withAuthor) params.set('withAuthor', 'true');
				if (showAll) params.set('showAll', 'true');
				return `/events?${params.toString()}`;
			},
			providesTags: ['Events'],
		}),
		getEvent: builder.query<EventType, string>({
			query: (slug) => `/events/${slug}`,
			providesTags: (result, error, slug) => [
				{ type: 'Events', id: slug },
				{ type: 'MyEvents', id: slug },
			],
		}),
		createEvent: builder.mutation<EventType, CreateEventDto>({
			query: (body) => ({
				url: '/events',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Events', 'MyEvents'],
		}),
		updateEvent: builder.mutation<
			EventType,
			{ slug: string; body: UpdateEventDto }
		>({
			query: ({ slug, body }) => ({
				url: `/events/${slug}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: (_result, _error, { slug }) => [
				'Events',
				'MyEvents',
				{ type: 'Events', id: slug },
				{ type: 'MyEvents', id: slug },
			],
		}),
		deleteEvent: builder.mutation<{ ok: boolean }, string>({
			query: (slug) => ({
				url: `/events/${slug}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Events', 'MyEvents'],
		}),
		getMyEvents: builder.query<
			{ events: EventType[]; total: number },
			{ page: number; query?: string; pageSize?: number }
		>({
			query: ({ page, query, pageSize = 4 }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				return `my/events?${params.toString()}`;
			},
			providesTags: ['MyEvents'],
		}),
		publishEvent: builder.mutation<EventType, string>({
			query: (slug) => ({
				url: `/events/${slug}`,
				method: 'PATCH',
				body: { published: true },
			}),
			invalidatesTags: (_result, _error, slug) => [
				'Events',
				'MyEvents',
				{ type: 'Events', id: slug },
				{ type: 'MyEvents', id: slug },
			],
		}),
		unpublishEvent: builder.mutation<EventType, string>({
			query: (slug) => ({
				url: `/events/${slug}`,
				method: 'PATCH',
				body: { published: false },
			}),
			invalidatesTags: (_result, _error, slug) => [
				'Events',
				'MyEvents',
				{ type: 'Events', id: slug },
				{ type: 'MyEvents', id: slug },
			],
		}),
	}),
});

export const {
	useGetAllEventsQuery,
	useGetEventQuery,
	useCreateEventMutation,
	useUpdateEventMutation,
	useDeleteEventMutation,
	useGetMyEventsQuery,
	usePublishEventMutation,
	useUnpublishEventMutation,
} = eventsApi;
