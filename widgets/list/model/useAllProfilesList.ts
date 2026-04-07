import { useGetAllProfilesQuery } from '@/entities/profiles';

export const useAllProfilesList = (
	page: number,
	query: string,
	pageSize: number,
) => {
	return useGetAllProfilesQuery({ page, query, pageSize });
};
