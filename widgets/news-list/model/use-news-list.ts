import { useGetAllNewsQuery } from '@/entities/news';

export const useNewsList = (page: number, query: string, pageSize: number) => {
	return useGetAllNewsQuery({ page, query, pageSize });
};
