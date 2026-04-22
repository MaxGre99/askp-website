import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import { Avatar } from '@/entities/avatars';
import { Profile } from '@/entities/profiles';

export const ProfileCard = ({ profile }: { profile: Profile }) => {
	const { t } = useTranslation();

	return (
		<Link
			href={`/specialists/${profile.userId}`}
			className='flex justify-center'
		>
			<div className='bg-white rounded-2xl backdrop-blur-2xl max-w-[280px] max-h-[524px] w-[280px] h-[524px] flex flex-col gap-2 items-center p-3 transition hover:scale-[1.01]'>
				<div className='min-w-[256px] min-h-[256px] w-[256px] h-[256px] rounded-2xl flex items-center justify-center border border-gray-200'>
					<Avatar src={profile.avatarUrl} className='rounded-2xl' />
				</div>
				<div className='flex flex-1 w-full flex-col gap-2 justify-start items-center text-center wrap-anywhere overflow-hidden'>
					<p className='font-bold w-full'>{profile.displayName}</p>
					{profile.membershipLevel && (
						<p className='w-full'>{t(`labels.${profile.membershipLevel}`)}</p>
					)}
					<p className='font-bold w-full'>г. {profile.city}</p>

					<div className='flex-1 w-full overflow-hidden'>
						<p className='line-clamp-5'>{profile.shortBio}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
