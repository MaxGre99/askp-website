import {
	useApproveApplicationMutation,
	useBlockApplicationMutation,
	useRejectApplicationMutation,
	useSetAdminApplicationMutation,
	useUnblockApplicationMutation,
} from '@/entities/applications';

export const useApplicationActions = () => {
	const [approve] = useApproveApplicationMutation();
	const [reject] = useRejectApplicationMutation();
	const [block] = useBlockApplicationMutation();
	const [unblock] = useUnblockApplicationMutation();
	const [setAdmin] = useSetAdminApplicationMutation();

	return {
		approve,
		reject,
		block,
		unblock,
		setAdmin,
	};
};
