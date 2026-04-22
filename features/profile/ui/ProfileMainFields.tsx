'use client';

import { useTranslation } from 'react-i18next';

import { Profile } from '@/entities/profiles';
import { PROFILE_MAIN_LABELS } from '@/features/profile/model/labels';
import { FormField } from '@/shared/ui/FormField';

interface Props {
	profile?: Profile;
	isEditing: boolean;
	observer?: boolean;
}

export const ProfileMainFields = ({ profile, isEditing, observer }: Props) => {
	const { t } = useTranslation();

	const labels = observer
		? PROFILE_MAIN_LABELS.filter(
				(label) =>
					label !== 'firstName' &&
					label !== 'lastName' &&
					label !== 'middleName',
			)
		: PROFILE_MAIN_LABELS;

	return (
		<>
			{labels.map((label) =>
				isEditing ? (
					<FormField<Profile>
						key={label}
						name={label as keyof Profile}
						label={t(`labels.${label}`)}
						placeholder={t(`labels.${label}`)}
						type={label === 'birthDate' ? 'date' : 'text'}
						required={label === 'firstName' || label === 'lastName'}
					/>
				) : (
					<div key={label}>
						<strong>
							{t(
								`labels.${observer && label === 'displayName' ? 'firstName' : label}`,
							)}
							:
						</strong>{' '}
						{label === 'birthDate'
							? profile?.birthDate
								? new Date(profile.birthDate).toLocaleDateString('ru-RU')
								: '—'
							: (profile?.[label as keyof Profile] as string) || '—'}
					</div>
				),
			)}
			<div>
				<strong>{t('labels.membershipLevel')}:</strong>{' '}
				{t(`labels.${profile?.membershipLevel}`) || '—'}
			</div>
		</>
	);
};
