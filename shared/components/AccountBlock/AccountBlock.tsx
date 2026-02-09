import { useRef, useState } from 'react';
import { FaRegBell, FaRegUser } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { TbSettings } from 'react-icons/tb';
import { MdOutlineLogout } from 'react-icons/md';
import Link from 'next/link';

import Button from '../Button/Button';
import SignInForm from '../SignInForm/SignInForm';
import { useSignOutMutation } from '@/shared/api/authApi';
import { useUploadAvatarMutation } from '@/shared/api/uploadApi';
import { useGetUserQuery, useUpdateAvatarMutation } from '@/shared/api/userApi';

const AccountBlock = () => {
	const [showMenu, setShowMenu] = useState(true);

	const { data: user } = useGetUserQuery();
	const [signOut] = useSignOutMutation();
	const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();
	const [updateAvatar] = useUpdateAvatarMutation();

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
			const { url } = await uploadAvatar(formData).unwrap();
			await updateAvatar({ avatar: url }).unwrap();
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
						<div className='flex items-center gap-2'>
							<div className='rounded-[50%] bg-gray-100 w-[64px] h-[64px] flex items-center justify-center border-black border overflow-hidden'>
								{user.avatar ? (
									<img
										src={user.avatar}
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
								<p>{user.firstName}</p>
								<p>{user.lastName}</p>
								<p>{user.email}</p>
							</div>

							<div className='flex gap-1 items-center'>
								<Link href='/account/settings'>
									<Button className='w-fit! h-fit! text-black!'>
										<TbSettings />
									</Button>
								</Link>

								<Button
									className='w-fit! h-fit! text-black!'
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
