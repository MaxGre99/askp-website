/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useDeleteArticleMutation,
	useGetAllArticlesQuery,
	useGetMyArticlesQuery,
} from '@/entities/articles';
import {
	useDeleteEventMutation,
	useGetAllEventsQuery,
	useGetMyEventsQuery,
} from '@/entities/events';
import {
	useDeleteNewsMutation,
	useGetAllNewsQuery,
	useGetMyNewsQuery,
} from '@/entities/news';

export const CONTENT_LIST_CONFIG = {
	news: {
		getAllQuery: useGetAllNewsQuery,
		getMyQuery: useGetMyNewsQuery,
		deletemutation: useDeleteNewsMutation,
		getItems: (data: any) => data?.news ?? [],
		getTotal: (data: any) => data?.total ?? 0,
		addHref: '/account/news/add',
		addButtonKey: 'buttons.addNews',
		titleKey: 'news.pageTitle',
	},
	events: {
		getAllQuery: useGetAllEventsQuery,
		getMyQuery: useGetMyEventsQuery,
		deletemutation: useDeleteEventMutation,
		getItems: (data: any) => data?.events ?? [],
		getTotal: (data: any) => data?.total ?? 0,
		addHref: '/account/events/add',
		addButtonKey: 'buttons.addEvent',
		titleKey: 'events.pageTitle',
	},
	articles: {
		getAllQuery: useGetAllArticlesQuery,
		getMyQuery: useGetMyArticlesQuery,
		deletemutation: useDeleteArticleMutation,
		getItems: (data: any) => data?.articles ?? [],
		getTotal: (data: any) => data?.total ?? 0,
		addHref: '/account/articles/add',
		addButtonKey: 'buttons.addArticle',
		titleKey: 'articles.pageTitle',
	},
} as const;

export type ContentListType = keyof typeof CONTENT_LIST_CONFIG;
