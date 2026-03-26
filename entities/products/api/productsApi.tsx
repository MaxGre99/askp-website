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
			{ page: number; query?: string; pageSize?: number; showAll?: boolean }
		>({
			query: ({ page, query, pageSize = 8, showAll }) => {
				const params = new URLSearchParams();
				params.set('page', String(page));
				params.set('pageSize', String(pageSize));
				if (query) params.set('query', query);
				if (showAll) params.set('showAll', 'true');
				return `/products?${params}`;
			},
			providesTags: ['Products'],
		}),
		getProduct: builder.query<Product, string>({
			query: (slug) => `/products/${slug}`,
			providesTags: (_result, _error, slug) => [{ type: 'Products', id: slug }],
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
			invalidatesTags: (_result, _error, { slug }) => [
				'Products',
				{ type: 'Products', id: slug },
			],
		}),
		deleteProduct: builder.mutation<{ ok: boolean }, string>({
			query: (slug) => ({ url: `/products/${slug}`, method: 'DELETE' }),
			invalidatesTags: ['Products'],
		}),
		publishProduct: builder.mutation<Product, string>({
			query: (slug) => ({
				url: `/products/${slug}`,
				method: 'PATCH',
				body: { published: true },
			}),
			invalidatesTags: (_result, _error, slug) => [
				'Products',
				{ type: 'Products', id: slug },
			],
		}),
		unpublishProduct: builder.mutation<Product, string>({
			query: (slug) => ({
				url: `/products/${slug}`,
				method: 'PATCH',
				body: { published: false },
			}),
			invalidatesTags: (_result, _error, slug) => [
				'Products',
				{ type: 'Products', id: slug },
			],
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	usePublishProductMutation,
	useUnpublishProductMutation,
} = productsApi;
