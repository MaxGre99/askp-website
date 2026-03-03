import { useTranslation } from 'react-i18next';

import { Profile } from '@/entities/profiles';
import { ProfileCard } from '@/entities/profiles/ui/ProfileCard';

type Props = {
	items: Profile[];
};

const HomeSpecialists = ({ items }: Props) => {
	const { t } = useTranslation();

	const x3 = [...items, ...items, ...items];

	console.log(x3);
	return (
		<section className='flex flex-col gap-5 w-full'>
			<h1 className='font-bad-script text-white'>{t('profiles.homeTitle')}:</h1>
			{items.length > 0 ? (
				<div className='w-full flex flex-1 items-center justify-around'>
					{x3.map((profile, index) => {
						return (
							<ProfileCard
								key={`${profile.userId}-${index}`}
								profile={profile}
							/>
						);
					})}
				</div>
			) : (
				<p className='font-bad-script text-white text-3xl'>
					{t('notifications.empty')}
				</p>
			)}
		</section>
	);
};

export default HomeSpecialists;
