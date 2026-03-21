import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		credentials: 'include', // важно для httpOnly cookie
	}),
	tagTypes: [
		'Profiles',
		// 'Applications',
		'Events',
		'News',
		'Me',
		'MyNews',
		'MyEvents',
		'Articles',
		'MyArticles',
		'MyProfile',
		'Donaters',
		'Products',
		'Users',
	],
	endpoints: () => ({}),
});
