'use client';

import { useEffect, useState } from 'react';
import { FaRegBell, FaRegUser } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

import Button from '../Button/Button';
import SignInForm from '../LogInForm/LogInForm';

const AccountBlock = () => {
	const [showMenu, setShowMenu] = useState(false);

	const handleShowMenu = () => {
		setShowMenu((prev) => !prev);
	};

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch('/api/me', {
					method: 'GET',
				});

				const data = await res.json();
				console.log(data);
			} catch {
			} finally {
			}
		};

		getUser();
	}, []);

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
				<div className='absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-64 z-50'>
					{status === 'authenticated' ? (
						<div className='flex items-center gap-2'>
							<span className='text-sm text-gray-600'>
								{session.user.email} ({session.user.role})
							</span>
							<Button
								className='hover:bg-transparent! hover:text-red-400'
								onClick={() => signOut()}
							>
								Выйти
							</Button>
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
