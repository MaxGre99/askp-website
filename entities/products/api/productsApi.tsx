import { baseApi } from '@/shared/api';

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

export const productsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllProducts: builder.query<
			{ products: Product[]; total: number },
			{ page: number; query?: string; pageSize?: number }
		>({
			query: ({ page, query, pageSize = 8 }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				return `/products?${params}`;
			},
			providesTags: ['Products'],
		}),
		getProduct: builder.query<Product, string>({
			query: (slug) => `/products/${slug}`,
			providesTags: (_r, _e, slug) => [{ type: 'Products', id: slug }],
		}),
		createProduct: builder.mutation<Product, Partial<Product>>({
			query: (body) => ({ url: '/products', method: 'POST', body }),
			invalidatesTags: ['Products'],
		}),
		updateProduct: builder.mutation<
			Product,
			{ slug: string; body: Partial<Product> }
		>({
			query: ({ slug, body }) => ({
				url: `/products/${slug}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: (_r, _e, { slug }) => [
				'Products',
				{ type: 'Products', id: slug },
			],
		}),
		deleteProduct: builder.mutation<{ ok: boolean }, string>({
			query: (slug) => ({ url: `/products/${slug}`, method: 'DELETE' }),
			invalidatesTags: ['Products'],
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsApi;
