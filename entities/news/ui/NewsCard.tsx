// import Image from 'next/image';
import Link from 'next/link';

import { MdImageNotSupported } from 'react-icons/md';

import { stripHtml } from '@/shared/lib/formatters';

import { NewsType } from '../model/types';

interface NewsCard {
	news: NewsType;
	type: string;
}

export const NewsCard = ({ news, type }: NewsCard) => {
	return (
		<Link href={`/${type}/${news.slug}`} className='flex justify-center'>
			<article className='bg-white backdrop-blur-2xl flex flex-col gap-1 rounded-2xl min-h-[368px] h-[368px] min-w-[300px] w-[300px] transition hover:scale-[1.01] md:min-w-[360px] md:w-[360px] xl:min-w-[425px] xl:w-[425px]'>
				{news?.image ? (
					<img
						src={news?.image}
						alt='news-cover'
						className='rounded-2xl min-h-[180px] h-[180px] min-w-full border-b border-gray-200 md:min-h-[202px] md:h-[202px] xl:min-h-[232px] xl:h-[232px]'
						// width={500}
						// height={100}
					/>
				) : (
					<div className='rounded-2xl min-h-[180px] h-[180px] min-w-full flex items-center justify-center border-b border-gray-200 md:min-h-[202px] md:h-[202px] xl:min-h-[232px] xl:h-[232px]'>
						<MdImageNotSupported size={64} className='text-gray-300' />
					</div>
				)}
				<div className='p-3 flex flex-col gap-1 justify-start items-start'>
					<h3 className='text-ellipsis max-w-full line-clamp-1'>
						{news.title}
					</h3>
					<p className='line-clamp-5 md:line-clamp-4 xl:line-clamp-3'>
						{stripHtml(news.content)}
					</p>
				</div>
			</article>
		</Link>
	);
};
