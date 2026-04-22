import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useConfirmModal } from '@/shared/custom-hooks';
import { Button } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';

import { USER_ACTIONS, UserAction } from '../model/actions-config';
import { useUserActions } from '../model/useUserActions';

export const UsersActions = ({
	id,
	types,
}: {
	id: string;
	types: UserAction[];
}) => {
	const { t } = useTranslation();
	const actions = useUserActions();
	const { confirmProps, confirm } = useConfirmModal();

	const blockTypes = ['reject', 'block', 'setUser', 'deleteUser'];

	const sortedTypes = [...types].sort((a, b) =>
		a === 'deleteUser' ? 1 : b === 'deleteUser' ? -1 : 0,
	);

	return (
		<>
			<ConfirmModal {...confirmProps} />
			<div className='flex gap-2'>
				{sortedTypes.map((type) => {
					const { icon: Icon, color } = USER_ACTIONS[type];
					return (
						<Button
							key={type}
							title={t(`buttons.${type}`)}
							onClick={() =>
								confirm(
									t(`buttons.${type}`),
									async () => {
										await actions[type](id);
										toast.success(t(`notifications.user${type}`));
									},
									blockTypes.includes(type) ? 'delete' : 'confirm',
								)
							}
							className={`h-9 w-9 rounded-lg p-0! border-transparent ${color}`}
						>
							<Icon size={18} />
						</Button>
					);
				})}
			</div>
		</>
	);
};
