import { useGetAllEventsQuery } from '@/entities/events';

export const useAllEventsList = (
	page: number,
	query: string,
	pageSize: number,
) => {
	return useGetAllEventsQuery({ page, query, pageSize });
};
