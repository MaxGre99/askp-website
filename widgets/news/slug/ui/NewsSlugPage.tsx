'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useGetNewsQuery } from '@/entities/news';
import { handleApiError } from '@/shared/lib/helpers';
import { Loader } from '@/shared/ui/Loader';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

export const NewsSlugPage = () => {
	const { slug } = useParams();

	const { data, isLoading, isError, error } = useGetNewsQuery(
		(slug as string)!,
	);

	useEffect(() => {
		if (isError) handleApiError(error);
	}, [isError, error]);

	if (isLoading) return <Loader />;

	return (
		<div className='flex flex-1 flex-col w-full justify-start items-center bg-white rounded-2xl'>
			{data?.image && (
				<img
					src={data.image}
					alt='news-cover'
					className='rounded-2xl w-full h-[300px] md:h-[360px] lg:h-[420px] xl:h-[720px]'
					// width={500}
					// height={100}
				/>
			)}
			<div className='flex flex-col gap-6 p-6 flex-1 w-full'>
				<h3 className='text-3xl text-center break-all'>{data?.title}</h3>
				<TipTapReadOnly content={data?.content ?? ''} noBorder />
			</div>
		</div>
	);
};
