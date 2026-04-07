import { AuthorWithProfile } from '@/shared/custom-types';

export type CreateNewsDto = {
	title: string;
	content: string;
	image?: string | null;
	published: boolean;
};

export type UpdateNewsDto = {
	title?: string;
	content?: string;
	image?: string | null;
	published?: boolean;
};

export type NewsType = {
	id: string;
	title: string;
	slug: string;
	content: string;
	image?: string;
	published: boolean;
	authorId: string;
	createdAt: string;
	updatedAt: string;
	author?: AuthorWithProfile;
};
