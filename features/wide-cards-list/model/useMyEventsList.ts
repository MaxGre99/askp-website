import { useGetMyEventsQuery } from '@/entities/events';

export const useMyEventsList = (
	page: number,
	query: string,
	pageSize: number,
) => {
	return useGetMyEventsQuery({ page, query, pageSize });
};
