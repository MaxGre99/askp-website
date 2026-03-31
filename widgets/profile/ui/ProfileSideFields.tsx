'use client';

import { useTranslation } from 'react-i18next';

import { Profile } from '@/entities/profiles';
import { FormikSelect } from '@/shared/ui/FormikSelect';

import { PROFILE_SIDE_LABELS } from '../model/labels';

interface Props {
	profile?: Profile;
	isEditing: boolean;
}

export const ProfileSideFields = ({ profile, isEditing }: Props) => {
	const { t } = useTranslation();

	const options = {
		gender: [
			{ value: 'MALE', label: t('labels.MALE') },
			{ value: 'FEMALE', label: t('labels.FEMALE') },
			{ value: 'OTHER', label: t('labels.OTHER') },
		],
		maritalStatus: [
			{ value: 'SINGLE', label: t('labels.SINGLE') },
			{ value: 'MARRIED', label: t('labels.MARRIED') },
			{ value: 'DIVORCED', label: t('labels.DIVORCED') },
			{ value: 'WIDOWED', label: t('labels.WIDOWED') },
		],
		languages: [
			{ value: 'ru', label: t('labels.ru') },
			{ value: 'en', label: t('labels.en') },
			{ value: 'fr', label: t('labels.fr') },
		],
	};

	return (
		<>
			{PROFILE_SIDE_LABELS.map((label) =>
				isEditing ? (
					<FormikSelect
						key={label}
						name={label as keyof Profile}
						label={t(`labels.${label}`)}
						options={options[label as keyof typeof options] || []}
						isMulti={label === 'languages'}
						placeholder={t(`placeholders.${label}`)}
					/>
				) : (
					<div key={label}>
						<strong>{t(`labels.${label}`)}:</strong>{' '}
						{label === 'languages'
							? (profile?.languages || [])
									.map((l) => t(`labels.${l}`))
									.join(', ')
							: profile?.[label as keyof Profile]
								? t(`labels.${profile?.[label as keyof Profile]}`)
								: '—'}
					</div>
				),
			)}
		</>
	);
};
