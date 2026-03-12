import { useGetAllArticlesQuery } from '@/entities/articles';

export const useAllArticlesList = (
	page: number,
	query: string,
	pageSize: number,
) => {
	return useGetAllArticlesQuery({ page, query, pageSize });
};
