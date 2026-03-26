'use client';

import { useParams } from 'next/navigation';

import { useGetNewsQuery } from '@/entities/news';
import { Loader } from '@/shared/ui/Loader';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

export const NewsSlugPage = () => {
	const { slug } = useParams();

	const { data, isLoading } = useGetNewsQuery((slug as string)!);

	if (isLoading) return <Loader />;

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
				<TipTapReadOnly content={data?.content ?? ''} noBorder />
			</div>
		</div>
	);
};
