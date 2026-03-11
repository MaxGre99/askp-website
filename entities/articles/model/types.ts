export type Article = {
	id: string;
	title: string;
	slug: string;
	content: string;
	image?: string;
	published: boolean;
	authorId: string;
	author: string;
	createdAt: string;
	updatedAt: string;
};
