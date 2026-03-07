export const extractImageUrls = (html: string): string[] => {
	return Array.from(html.matchAll(/<img[^>]+src="([^"]+)"/g), (m) => m[1]);
};
