import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaHouseUser, /* FaRegBell, */ FaRegUser } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

import { Avatar, useGetAvatarQuery } from '@/entities/avatars';
import { useGetProfileQuery } from '@/entities/profiles';
import { useGetMeQuery, useSignOutMutation } from '@/entities/users';
import { getDisplayName } from '@/shared/lib/getDisplayName';
import { Button } from '@/shared/ui/Button';

import { SignInForm } from './SignInForm';

export const AccountBlock = () => {
	const pathname = usePathname();
	const { t } = useTranslation();
	const [showMenu, setShowMenu] = useState(false);

	const { data: user } = useGetMeQuery();
	const [signOut] = useSignOutMutation();
	const { data: avatar } = useGetAvatarQuery(user?.id as string, {
		skip: !user?.id,
	});
	const { data: profile } = useGetProfileQuery(user?.id as string, {
		skip: !user?.id,
	});

	const onSignOut = async () => {
		await signOut();
	};

	const handleShowMenu = () => {
		setShowMenu((prev) => !prev);
	};

	useEffect(() => {
		setShowMenu(false);
	}, [pathname]);

	return (
		<div className='flex relative'>
			{/* <Button className='hover:bg-transparent! hover:text-amber-400' variant='ghost'>
				<FaRegBell />
			</Button> */}
			<Button
				className={clsx(
					'hover:text-cyan-300 active:text-cyan-200',
					showMenu && 'text-cyan-300!',
				)}
				variant='ghost'
				onClick={handleShowMenu}
			>
				<FaRegUser size={24} />
			</Button>

			{showMenu && (
				<div className='absolute top-full right-0 mt-2 bg-white shadow-lg rounded-2xl p-4 z-50 min-w-[256px]'>
					{user ? (
						<div className='flex items-center gap-6'>
							<div className='rounded-[50%] bg-gray-50 min-w-[64px] min-h-[64px] w-[64px] h-[64px] flex items-center justify-center border-gray-200 border overflow-hidden'>
								<Avatar src={avatar?.url} size={48} />
							</div>

							<div className='flex flex-col gap-1 text-black'>
								<p className='text-nowrap'>{getDisplayName(profile, user)}</p>
								<Link
									href={'/account'}
									className='flex gap-1 items-center hover:underline'
								>
									<FaHouseUser />
									<p className='text-nowrap'>{t('account.title')}</p>
								</Link>
							</div>

							<div className='flex gap-2 items-center self-start'>
								<Button
									className='w-fit! h-fit! text-black! p-0! border-0!'
									onClick={onSignOut}
									variant='ghost'
								>
									<MdOutlineLogout size={20} />
								</Button>
							</div>
						</div>
					) : (
						<SignInForm setShowMenu={setShowMenu} />
					)}
				</div>
			)}
		</div>
	);
};
