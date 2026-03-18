'use client';

import { useParams } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useGetEventQuery } from '@/entities/events';
import { SignUpToEventForm } from '@/features/sign-up-to-event-form';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

export const EventSlugPage = () => {
	const { t } = useTranslation();

	const { slug } = useParams();

	const { data, isLoading } = useGetEventQuery((slug as string)!);

	if (isLoading) {
		return <div></div>;
	}

	return (
		<div className='flex flex-1 flex-col w-full justify-start items-center bg-white rounded-2xl'>
			{data?.image && (
				<img
					src={data.image}
					alt='news-cover'
					className='rounded-2xl w-full h-[720px]'
					// width={500}
					// height={100}
				/>
			)}
			<div className='flex flex-col gap-6 p-6 flex-1 w-full'>
				<h3 className='text-3xl text-center'>{data?.title}</h3>
				<TipTapReadOnly content={data?.description ?? ''} noBorder />
			</div>
			<section className='flex flex-col gap-5 items-center w-full mb-6'>
				<h2 className='font-oswald'>{t('events.signUpForm')}</h2>
				<SignUpToEventForm eventName={data?.title ?? ''} />
			</section>
		</div>
	);
};
