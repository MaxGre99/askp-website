export interface Product {
	id: string;
	slug: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	published: boolean;
	createdAt: string;
	updatedAt: string;
	contentLink?: string;
}
