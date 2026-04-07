'use client';

import { Profile } from '@/entities/profiles';
import { ProfileMainFields, ProfileSideFields } from '@/features/profile';

import { AvatarUploadWithModal } from './AvatarUploadBlockWithModal';

interface Props {
	profile?: Profile;
	isEditing: boolean;
}

export const ProfileMainBlock = ({ profile, isEditing }: Props) => {
	return (
		<div className='flex flex-row gap-6 flex-wrap justify-center items-center'>
			<AvatarUploadWithModal userId={profile?.userId} />

			<div className='flex flex-1 flex-col gap-4'>
				<ProfileMainFields profile={profile} isEditing={isEditing} />
				<ProfileSideFields profile={profile} isEditing={isEditing} />
			</div>
		</div>
	);
};
