'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useGetEventQuery } from '@/entities/events';
import { handleApiError } from '@/shared/lib/helpers';
import { Loader } from '@/shared/ui/Loader';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

import { SignUpToEventForm } from './SignUpToEventForm';

export const EventSlugPage = () => {
	const { slug } = useParams();

	const { data, isLoading, isError, error } = useGetEventQuery(
		(slug as string)!,
	);

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	if (isLoading) return <Loader />;

	return (
		<div className='flex flex-1 flex-col w-full justify-start items-center bg-white rounded-2xl'>
			{data?.image && (
				<div className='w-full aspect-4/3 overflow-hidden rounded-2xl'>
					<img
						src={data.image}
						alt='event-cover'
						className='w-full h-full object-cover'
					/>
				</div>
			)}
			<div className='flex flex-col gap-6 p-6 flex-1 w-full'>
				<h3 className='text-3xl text-center break-all'>{data?.title}</h3>
				<TipTapReadOnly content={data?.description ?? ''} noBorder />
			</div>
			<section className='flex flex-col gap-5 items-center w-full p-6'>
				<SignUpToEventForm eventName={data?.title ?? ''} />
			</section>
		</div>
	);
};
