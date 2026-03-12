import { useGetMyArticlesQuery } from '@/entities/articles';

export const useMyArticlesList = (
	page: number,
	query: string,
	pageSize: number,
) => {
	return useGetMyArticlesQuery({ page, query, pageSize });
};
