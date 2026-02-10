import { useRef, useState } from 'react';
import { FaRegBell, FaRegUser } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { TbSettings } from 'react-icons/tb';
import { MdOutlineLogout } from 'react-icons/md';
import Link from 'next/link';
import { BsHouse } from 'react-icons/bs';

import Button from '../Button/Button';
import SignInForm from '../SignInForm/SignInForm';
import { useSignOutMutation } from '@/shared/api/authApi';
import {
	useGetAvatarQuery,
	useUploadAvatarMutation,
} from '@/shared/api/avatarsApi';
import { useGetUserQuery } from '@/shared/api/userApi';

const AccountBlock = () => {
	const [showMenu, setShowMenu] = useState(false);

	const { data: user } = useGetUserQuery();
	const [signOut] = useSignOutMutation();
	const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();
	const { data: avatar } = useGetAvatarQuery(user?.id as string, {
		skip: !user?.id,
	});

	const fileInputRef = useRef<HTMLInputElement>(null);

	const onSignOut = async () => {
		await signOut();
	};

	const handleShowMenu = () => {
		setShowMenu((prev) => !prev);
	};

	const onSelectAvatar = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);

		try {
			await uploadAvatar(formData).unwrap();
		} catch (e) {
			console.error('Avatar update failed', e);
		}
	};

	return (
		<div className='flex relative'>
			<Button className='hover:bg-transparent! hover:text-amber-400'>
				<FaRegBell />
			</Button>

			<Button
				className='hover:bg-transparent! hover:text-cyan-300'
				onClick={handleShowMenu}
			>
				<FaRegUser />
			</Button>

			{showMenu && (
				<div className='absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg p-4 min-w-64 z-50'>
					{user ? (
						<div className='flex items-center gap-6'>
							<div className='rounded-[50%] bg-gray-100 min-w-[64px] min-h-[64px] w-[64px] h-[64px] flex items-center justify-center border-black border overflow-hidden'>
								{avatar?.url ? (
									<img
										src={avatar?.url}
										alt='avatar'
										className='w-full h-full object-cover'
									/>
								) : (
									<>
										<input
											ref={fileInputRef}
											type='file'
											accept='image/*'
											className='hidden'
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file) onSelectAvatar(file);
											}}
										/>

										<Button
											className='w-fit! h-fit! text-black!'
											disabled={isLoading}
											onClick={() => fileInputRef.current?.click()}
										>
											<BiImageAdd />
										</Button>
									</>
								)}
							</div>

							<div className='flex flex-col gap-1 text-black'>
								<p className='text-nowrap'>
									{user.firstName} {user.lastName}
								</p>
								<Link
									href={'/account'}
									className='flex gap-1 items-center hover:underline'
								>
									<BsHouse />
									<p>Личный кабинет</p>
								</Link>
							</div>

							<div className='flex gap-2 items-center self-start'>
								<Link href='/account/settings'>
									<Button className='w-fit! h-fit! text-black! p-0!'>
										<TbSettings />
									</Button>
								</Link>

								<Button
									className='w-fit! h-fit! text-black! p-0!'
									onClick={onSignOut}
								>
									<MdOutlineLogout />
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

export default AccountBlock;
