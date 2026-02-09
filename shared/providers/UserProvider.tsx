import { useGetUserQuery } from '../api/userApi';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	useGetUserQuery();

	return children;
};

export default UserProvider;
