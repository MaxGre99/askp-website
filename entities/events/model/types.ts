import { AuthorWithProfile } from '@/shared/lib/getAuthorName';

export type CreateEventDto = {
	title: string;
	description: string;
	image?: string | null;
	eventDate: string;
	published: boolean;
};

export type UpdateEventDto = {
	title?: string;
	description?: string;
	image?: string | null;
	eventDate?: string;
	published?: boolean;
};

export type EventType = {
	id: string;
	title: string;
	slug: string;
	description: string;
	image?: string | null;
	published: boolean;
	authorId: string;
	eventDate: string;
	createdAt: string;
	updatedAt: string;
	author?: AuthorWithProfile;
};
