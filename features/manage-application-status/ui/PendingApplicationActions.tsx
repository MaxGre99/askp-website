import { useTranslation } from 'react-i18next';

import {
	APPLICATION_ACTIONS,
	ApplicationAction,
} from '../model/actions-config';
import { useApplicationActions } from '../model/useApplicationActions';

export const PendingApplicationActions = ({ id }: { id: string }) => {
	const { t } = useTranslation();
	const actions = useApplicationActions();

	return (
		<div className='flex gap-2'>
			{(['approve', 'reject', 'block'] as ApplicationAction[]).map((type) => {
				const { icon: Icon, color } = APPLICATION_ACTIONS[type];

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
