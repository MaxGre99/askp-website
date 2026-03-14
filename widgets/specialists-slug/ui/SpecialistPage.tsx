'use client';

import { useParams } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { Avatar } from '@/entities/avatars';
import { useGetProfileQuery } from '@/entities/profiles';
import {
	CONTACTS_CONFIG,
	PHONE_REF_CONFIG,
	PHONE_REF_ORDER,
} from '@/widgets/profile/model/contacts-config';
import { ContactButton } from '@/widgets/profile/ui/ContactButton';
import { ProfileBioSection } from '@/widgets/profile/ui/ProfileBioSection';
import { ProfileMainFields } from '@/widgets/profile/ui/ProfileMainFields';
import { ProfileSideFields } from '@/widgets/profile/ui/ProfileSideFields';

export const SpecialistPage = () => {
	const { userId } = useParams();
	const { data: profile, isLoading } = useGetProfileQuery(userId as string);
	const { t } = useTranslation();

	return (
		<div className='flex flex-1 w-full flex-col gap-6 bg-white rounded-2xl p-6'>
			<div className='flex flex-row gap-6 items-center justify-between'>
				<div className='rounded-md bg-gray-100 w-[256px] h-[256px] flex items-center justify-center border border-gray-400 overflow-hidden'>
					<Avatar src={profile?.avatarUrl} />
				</div>

				<div className='flex flex-1 flex-col gap-4'>
					<ProfileMainFields profile={profile} isEditing={false} observer />
					<ProfileSideFields profile={profile} isEditing={false} />
				</div>
			</div>

			<ProfileBioSection profile={profile} isEditing={false} />

			<div className='flex flex-col gap-2 w-full'>
				<label className='font-bold'>Контакты:</label>
				<div className='flex flex-wrap gap-5'>
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
		</div>
	);
};
