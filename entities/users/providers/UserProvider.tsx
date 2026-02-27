import { useGetUserQuery } from '../api/userApi';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	useGetUserQuery();

	return children;
};
