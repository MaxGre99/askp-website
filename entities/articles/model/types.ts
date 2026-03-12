import { AuthorWithProfile } from '@/shared/lib/getAuthorName';

export type Article = {
	id: string;
	title: string;
	slug: string;
	content: string;
	image?: string;
	published: boolean;
	authorId: string;
	author: AuthorWithProfile;
	createdAt: string;
	updatedAt: string;
};
