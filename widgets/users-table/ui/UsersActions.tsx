import { useTranslation } from 'react-i18next';

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

	return (
		<div className='flex gap-2'>
			{types.map((type) => {
				const { icon: Icon, color } = USER_ACTIONS[type];
				return (
					<button
						key={type}
						title={t(`buttons.${type}`)}
						onClick={() => actions[type](id)}
						className={`h-9 w-9 flex items-center justify-center rounded-lg text-white transition-colors ${color}`}
					>
						<Icon size={18} />
					</button>
				);
			})}
		</div>
	);
};
