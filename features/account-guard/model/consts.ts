export const ADMIN_ROUTES = [
	'/account/news',
	'/account/events',
	'/account/my-news',
	'/account/my-events',
	'/account/all-news',
	'/account/all-events',
	'/account/all-articles',
	'/account/pending-users',
	'/account/all-users',
	'/account/blocked-users',
	'/donate/add',
	'/shop/add',
];

export const ADMIN_ROUTE_PATTERNS = [
	/^\/donate\/[^/]+\/edit$/, // /donate/[slug]/edit
	/^\/shop\/[^/]+\/edit$/, // /shop/[slug]/edit
];
