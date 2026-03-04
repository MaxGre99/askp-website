import {
	useApproveApplicationMutation,
	useBlockApplicationMutation,
	useRejectApplicationMutation,
	useUnblockApplicationMutation,
} from '@/entities/applications';

export const useApplicationActions = () => {
	const [approve] = useApproveApplicationMutation();
	const [reject] = useRejectApplicationMutation();
	const [block] = useBlockApplicationMutation();
	const [unblock] = useUnblockApplicationMutation();

	return {
		approve,
		reject,
		block,
		unblock,
	};
};
