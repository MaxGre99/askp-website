import { Avatar, useGetAvatarQuery } from '@/entities/avatars';

import { Profile } from '../model/types';

export const ProfileCard = ({ profile }: { profile: Profile }) => {
	const { data: avatar } = useGetAvatarQuery(profile.userId);
	return (
		<div className='bg-white/70 rounded-2xl backdrop-blur-2xl max-w-[280px] max-h-[512px] w-[280px] h-[512px] flex flex-col gap-2 items-center p-3'>
			<div className='min-w-[256px] min-h-[256px] w-[256px] h-[256px] rounded-2xl flex items-center justify-center'>
				<Avatar src={avatar?.url} className='rounded-2xl' />
			</div>
			<div className='flex flex-col gap-2 justify-start items-start font-inter text-center'>
				<p className='font-bold text-ellipsis max-w-full'>
					{profile.displayName}
				</p>
				<p className='line-clamp-7 font-inter'>{profile.shortBio}</p>
			</div>
		</div>
	);
};
