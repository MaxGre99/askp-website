import {
	useApproveApplicationMutation,
	useBlockApplicationMutation,
	useRejectApplicationMutation,
	useUnblockApplicationMutation,
} from '@/entities/application/api/applicationsApi';

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
