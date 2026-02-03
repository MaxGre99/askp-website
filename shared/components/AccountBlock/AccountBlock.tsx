import { useState } from 'react';
import { FaRegBell, FaRegUser } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { TbSettings } from 'react-icons/tb';
import { MdOutlineLogout } from 'react-icons/md';

import Button from '../Button/Button';
import SignInForm from '../LogInForm/LogInForm';
import { useLogOutMutation, useMeQuery } from '@/shared/api/authApi';
import Link from 'next/link';

const AccountBlock = () => {
	const [showMenu, setShowMenu] = useState(true);
	const { data: user } = useMeQuery();

	const [logOut] = useLogOutMutation();

	const onLogOut = async () => {
		await logOut();
	};

	const handleShowMenu = () => {
		setShowMenu((prev) => !prev);
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
							<div className='rounded-[50%] bg-gray-100 w-[64px] h-[64px] flex items-center justify-center border-black border-[1px]'>
								{user.photo ? (
									<img src={user.photo} />
								) : (
									<Button className='!w-fit !h-fit !text-black'>
										<BiImageAdd />
									</Button>
								)}
							</div>
							<div className='flex flex-col gap-1 text-black'>
								<p>{user.firstName}</p>
								<p>{user.lastName}</p>
								<p>{user.email}</p>
							</div>
							<div className='flex gap-1 items-center'>
								<Link href={'/account/settings'}>
									<Button className='!w-fit !h-fit !text-black'>
										<TbSettings />
									</Button>
								</Link>

								<Button
									className='!w-fit !h-fit !text-black'
									onClick={onLogOut}
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
