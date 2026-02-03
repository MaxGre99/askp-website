import { useMeQuery } from '@/shared/api/authApi';

const MeProvider = ({ children }: { children: React.ReactNode }) => {
	useMeQuery();

	return children;
};

export default MeProvider;
