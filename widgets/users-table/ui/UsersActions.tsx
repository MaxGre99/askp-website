import { useTranslation } from 'react-i18next';

import { useConfirm } from '@/shared/hooks/useConfirmModal';
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
	const { confirmProps, confirm } = useConfirm();

	const blockTypes = ['reject', 'block', 'setUser'];

	return (
		<>
			<ConfirmModal {...confirmProps} />
			<div className='flex gap-2'>
				{types.map((type) => {
					const { icon: Icon, color } = USER_ACTIONS[type];
					return (
						<Button
							key={type}
							title={t(`buttons.${type}`)}
							onClick={() =>
								confirm(
									t(`buttons.${type}`),
									() => actions[type](id),
									blockTypes.includes(type) ? 'delete' : 'confirm',
								)
							}
							className={`h-9 w-9 rounded-lg p-0! border-transparent! ${color}`}
						>
							<Icon size={18} />
						</Button>
					);
				})}
			</div>
		</>
	);
};
