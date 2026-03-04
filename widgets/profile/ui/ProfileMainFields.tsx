'use client';

import { useTranslation } from 'react-i18next';

import { Profile } from '@/entities/profiles';
import { FormField } from '@/shared/ui/FormField';

import { PROFILE_MAIN_LABELS } from '../model/labels';

interface Props {
	profile?: Profile;
	isEditing: boolean;
}

export const ProfileMainFields = ({ profile, isEditing }: Props) => {
	const { t } = useTranslation();

	return (
		<>
			{PROFILE_MAIN_LABELS.map((label) =>
				isEditing ? (
					<FormField<Profile>
						key={label}
						name={label as keyof Profile}
						label={t(`labels.${label}`)}
						placeholder={t(`labels.${label}`)}
						type={label === 'birthDate' ? 'date' : 'text'}
						required
					/>
				) : (
					<div key={label}>
						<strong>{t(`labels.${label}`)}:</strong>{' '}
						{label === 'birthDate'
							? profile?.birthDate
								? new Date(profile.birthDate).toLocaleDateString('ru-RU')
								: '—'
							: (profile?.[label as keyof Profile] as string) || '—'}
					</div>
				),
			)}
		</>
	);
};
