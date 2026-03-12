import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import { FaHouseUser, /* FaRegBell, */ FaRegUser } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

import { Avatar, useGetAvatarQuery } from '@/entities/avatars';
import { useGetUserQuery, useSignOutMutation } from '@/entities/users';
import { TransparentButton } from '@/shared/ui/TransparentButton';

import { SignInForm } from './SignInForm';

export const AccountBlock = () => {
	const pathname = usePathname();
	const { t } = useTranslation();
	const [showMenu, setShowMenu] = useState(false);

	const { data: user } = useGetUserQuery();
	const [signOut] = useSignOutMutation();
	const { data: avatar } = useGetAvatarQuery(user?.id as string, {
		skip: !user?.id,
	});

	const onSignOut = async () => {
		await signOut();
	};

	const handleShowMenu = () => {
		setShowMenu((prev) => !prev);
	};

	useEffect(() => {
		const timer = setTimeout(() => setShowMenu(false), 0);
		return () => clearTimeout(timer);
	}, [pathname]);

	return (
		<div className='flex relative'>
			{/* <TransparentButton className='hover:bg-transparent! hover:text-amber-400'>
				<FaRegBell />
			</TransparentButton> */}
			<TransparentButton
				className='hover:bg-transparent! hover:text-cyan-300'
				onClick={handleShowMenu}
			>
				<FaRegUser />
			</TransparentButton>

			{showMenu && (
				<div className='absolute top-full right-0 mt-2 bg-white shadow-lg rounded-2xl p-4 min-w-64 z-50'>
					{user ? (
						<div className='flex items-center gap-6'>
							<div className='rounded-[50%] bg-gray-100 min-w-[64px] min-h-[64px] w-[64px] h-[64px] flex items-center justify-center border-gray-400 border overflow-hidden'>
								<Avatar src={avatar?.url} size={48} />
							</div>

							<div className='flex flex-col gap-1 text-black'>
								<p className='text-nowrap'>
									{user.firstName} {user.lastName}
								</p>
								<Link
									href={'/account'}
									className='flex gap-1 items-center hover:underline'
								>
									<FaHouseUser />
									<p>{t('account.title')}</p>
								</Link>
							</div>

							<div className='flex gap-2 items-center self-start'>
								<TransparentButton
									className='w-fit! h-fit! text-black! p-0!'
									onClick={onSignOut}
								>
									<MdOutlineLogout />
								</TransparentButton>
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
