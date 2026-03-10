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
};

export interface CreateNewsDto {
	title: string;
	content: string;
	image?: string;
	published: boolean;
}
