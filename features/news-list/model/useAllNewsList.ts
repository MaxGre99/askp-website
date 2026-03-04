import { useGetAllNewsQuery } from '@/entities/news';

export const useAllNewsList = (
	page: number,
	query: string,
	pageSize: number,
) => {
	return useGetAllNewsQuery({ page, query, pageSize });
};
