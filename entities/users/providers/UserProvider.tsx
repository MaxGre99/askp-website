import { useGetMeQuery } from '../api/authApi';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	useGetMeQuery();

	return children;
};
