import { AuthorWithProfile } from '@/shared/lib/getAuthorName';

export type CreateArticleDto = {
	title: string;
	content: string;
	image?: string | null;
	published: boolean;
};

export type UpdateArticleDto = {
	title?: string;
	content?: string;
	image?: string | null;
	published?: boolean;
};

export type Article = {
	id: string;
	title: string;
	slug: string;
	content: string;
	image?: string | null;
	published: boolean;
	authorId: string;
	author?: AuthorWithProfile;
	createdAt: string;
	updatedAt: string;
};
