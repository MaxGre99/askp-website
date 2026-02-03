'use client';

import { ReactNode } from 'react';

const LayoutShell = ({ children }: { children: ReactNode }) => {
	return (
		<main className='flex flex-col gap-5 p-5 rounded-2xl shadow-lg bg-white/20 backdrop-blur-2xl w-full max-w-[1440px] mx-auto min-h-[calc(100svh-348px)]'>
			{children}
		</main>
	);
};

export default LayoutShell;
