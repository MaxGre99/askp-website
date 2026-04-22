import {
	useApproveUserMutation,
	useBlockUserMutation,
	useDeleteUserMutation,
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
	const [deleteUser] = useDeleteUserMutation();

	return {
		approve,
		reject,
		block,
		unblock,
		setAdmin,
		setUser,
		deleteUser,
	};
};
