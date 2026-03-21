import {
	useApproveUserMutation,
	useBlockUserMutation,
	useRejectUserMutation,
	useSetAdminUserMutation,
	useUnblockUserMutation,
} from '@/entities/users';

export const useUserActions = () => {
	const [approve] = useApproveUserMutation();
	const [reject] = useRejectUserMutation();
	const [block] = useBlockUserMutation();
	const [unblock] = useUnblockUserMutation();
	const [setAdmin] = useSetAdminUserMutation();

	return {
		approve,
		reject,
		block,
		unblock,
		setAdmin,
	};
};
