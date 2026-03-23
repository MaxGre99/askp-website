import {
	useApproveUserMutation,
	useBlockUserMutation,
	useRejectUserMutation,
	useSetAdminUserMutation,
	useSetUserMutation,
	useUnblockUserMutation,
} from '@/entities/users';

export const useUserActions = () => {
	const [approve] = useApproveUserMutation();
	const [reject] = useRejectUserMutation();
	const [block] = useBlockUserMutation();
	const [unblock] = useUnblockUserMutation();
	const [setAdmin] = useSetAdminUserMutation();
	const [setUser] = useSetUserMutation();

	return {
		approve,
		reject,
		block,
		unblock,
		setAdmin,
		setUser,
	};
};
