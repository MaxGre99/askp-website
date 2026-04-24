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
				<div className='w-full aspect-4/3 overflow-hidden rounded-2xl'>
					<img
						src={data.image}
						alt='news-cover'
						className='w-full h-full object-cover'
					/>
				</div>
			)}
			<div className='flex flex-col gap-6 p-6 flex-1 w-full'>
				<h3 className='text-3xl text-center break-all'>{data?.title}</h3>
				<TipTapReadOnly content={data?.content ?? ''} noBorder />
				{data?.updatedAt && (
					<div className='flex justify-end italic text-gray-700'>
						<h5>
							{new Date(data.updatedAt).toLocaleString('ru-RU', {
								year: 'numeric',
								month: 'numeric',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							})}
						</h5>
					</div>
				)}
			</div>
		</div>
	);
};
