import { APPLICATION_ACTIONS } from '@/shared/config';
import { useApplicationActions } from '../model/use-application-actions';
import { useTranslation } from 'react-i18next';

export const BlockedApplicationActions = ({ id }: { id: string }) => {
	const { t } = useTranslation();
	const { unblock } = useApplicationActions();
	const { icon: Icon, color } = APPLICATION_ACTIONS.unblock;

	return (
		<button
			title={t('buttons.unblock')}
			onClick={() => unblock(id)}
			className={`h-9 w-9 flex items-center justify-center rounded-lg text-white ${color}`}
		>
			<Icon size={18} />
		</button>
	);
};
