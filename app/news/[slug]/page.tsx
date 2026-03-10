'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useGetNewsQuery } from '@/entities/news';
import { TipTapReadOnly } from '@/shared/ui/TipTapReadOnly';

const Page = () => {
	const { slug } = useParams();

	const { data, isLoading } = useGetNewsQuery((slug as string)!);
	console.log(data);
	if (isLoading) {
		return <div></div>;
	}
	return (
		<div className='flex flex-col gap-2 w-full justify-start items-center min-h-[1000px] bg-white rounded-2xl'>
			{data?.image && (
				<img
					src={data.image}
					alt='news-cover'
					className='rounded-2xl w-full h-[400px]'
					width={500}
					height={100}
				/>
			)}
			<h3 className='text-3xl text-center'>{data?.title}</h3>
			<TipTapReadOnly content={data?.content ?? ''} noBorder/>
		</div>
	);
};

export default Page;
