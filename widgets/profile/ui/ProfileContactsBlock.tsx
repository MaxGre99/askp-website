'use client';

import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import {} from 'react-icons/fa';

import { Profile } from '@/entities/profiles';
import { FormField } from '@/shared/ui/FormField';

import {
	CONTACTS_CONFIG,
	PHONE_REF_CONFIG,
	PHONE_REF_ORDER,
} from '../model/contacts-config';
import { PROFILE_CONTACT_LABELS } from '../model/labels';

import { ContactButton } from './ContactButton';

interface Props {
	profile?: Profile;
	isEditing: boolean;
}

export const ProfileContactsBlock = ({ profile, isEditing }: Props) => {
	const { t } = useTranslation();
	const [phoneRefsField, , phoneRefsHelpers] = useField<string[]>('phoneRefs');

	const phoneRefsOptions = [
		{ value: 'CALL', label: t('labels.call') },
		{ value: 'WHATSAPP', label: t('labels.whatsapp') },
		{ value: 'TELEGRAM', label: t('labels.telegram') },
	];

	if (!isEditing) {
		return (
			<div className='flex flex-col gap-2 w-full'>
				<label className='font-bold'>Контакты:</label>
				<div className='flex flex-wrap gap-5 gap-y-3'>
					{/* Кнопки из phoneRefs */}
					{profile?.phone &&
						[...(profile.phoneRefs ?? [])]
							.sort(
								(a, b) =>
									PHONE_REF_ORDER.indexOf(a) - PHONE_REF_ORDER.indexOf(b),
							)
							.map((ref) => {
								const config =
									PHONE_REF_CONFIG[ref as keyof typeof PHONE_REF_CONFIG];
								if (!config) return null;
								return (
									<ContactButton
										key={ref}
										icon={config.icon}
										label={t(`buttons.${config.label}`)}
										href={config.getHref(profile.phone!)}
										action={config.action}
									/>
								);
							})}

					{/* Остальные контакты (без phone) */}
					{CONTACTS_CONFIG.filter(
						({ key }) => key !== 'phone' && !!profile?.[key],
					).map(({ key, icon, action, getHref }) => (
						<ContactButton
							key={key}
							icon={icon}
							label={t(`buttons.${key}`)}
							href={getHref(profile![key] as string)}
							action={action}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-2 w-full'>
			<label className='font-bold'>Контакты:</label>
			{PROFILE_CONTACT_LABELS.map((label) =>
				label === 'phone' ? (
					<div
						key={label}
						className='flex flex-col gap-1 justify-start items-stretch w-full'
					>
						<FormField<Profile>
							name={label as keyof Profile}
							label={t(`labels.${label}`)}
							placeholder={t(`placeholders.${label}`)}
						/>
						<div className='flex gap-2 items-center justify-start'>
							{phoneRefsOptions.map((option) => (
								<label
									key={option.value}
									className='flex items-center gap-1 text-sm cursor-pointer'
								>
									<input
										type='checkbox'
										value={option.value}
										checked={phoneRefsField.value?.includes(option.value)}
										onChange={(e) => {
											const current = phoneRefsField.value ?? [];
											phoneRefsHelpers.setValue(
												e.target.checked
													? [...current, option.value]
													: current.filter((v) => v !== option.value),
											);
										}}
									/>
									{option.label}
								</label>
							))}
						</div>
					</div>
				) : (
					<FormField<Profile>
						key={label}
						name={label as keyof Profile}
						label={t(`labels.${label === 'telegramUser' ? 'telegram' : label}`)}
						placeholder={t(
							label === 'telegramUser'
								? 'placeholders.telegram'
								: `labels.${label}`,
						)}
					/>
				),
			)}
		</div>
	);
};
