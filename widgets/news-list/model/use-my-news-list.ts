import { useGetMyNewsQuery } from '@/entities/news';

export const useMyNewsList = (
	page: number,
	query: string,
	pageSize: number,
) => {
	return useGetMyNewsQuery({ page, query, pageSize });
};
