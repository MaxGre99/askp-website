'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useGetEventQuery } from '@/entities/events';
import { handleApiError } from '@/shared/lib/helpers';
import { Loader } from '@/shared/ui/Loader';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

import { SignUpToEventForm } from './SignUpToEventForm';

export const EventSlugPage = () => {
	const { slug } = useParams();
	const { t } = useTranslation();

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
			<div className='flex flex-col gap-6 p-6 pb-0 flex-1 w-full'>
				<h3 className='text-3xl text-center break-all'>{data?.title}</h3>
				<TipTapReadOnly content={data?.description ?? ''} noBorder />
				<div className='flex justify-center items-center text-center italic text-lg text-gray-700'>
					{data?.eventDate && (
						<h5>
							{t('labels.eventDate')}:<br />
							<span className='font-bold'>
								{new Date(data.eventDate).toLocaleString('ru-RU', {
									year: 'numeric',
									month: 'numeric',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</span>
						</h5>
					)}
				</div>
			</div>
			<section className='flex flex-col gap-5 items-center w-full p-6'>
				<SignUpToEventForm eventName={data?.title ?? ''} />
			</section>
		</div>
	);
};
