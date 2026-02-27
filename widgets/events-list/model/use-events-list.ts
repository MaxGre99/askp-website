import { useGetAllEventsQuery } from '@/entities/events';

export const useEventsList = (
	page: number,
	query: string,
	pageSize: number,
) => {
	return useGetAllEventsQuery({ page, query, pageSize });
};
