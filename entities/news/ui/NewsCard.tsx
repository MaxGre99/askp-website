// import Image from 'next/image';
import Link from 'next/link';

import { MdImageNotSupported } from 'react-icons/md';

import { stripHtml } from '@/shared/lib/stripHtml';

import { NewsType } from '../model/types';

interface NewsCard {
	news: NewsType;
	type: string;
}

export const NewsCard = ({ news, type }: NewsCard) => {
	return (
		<Link href={`/${type}/${news.slug}`}>
			<article className='bg-white backdrop-blur-2xl flex flex-col gap-1 rounded-2xl min-h-[368px] min-w-[425px] transition hover:scale-[1.01]'>
				{news?.image ? (
					<img
						src={news?.image}
						alt='news-cover'
						className='rounded-2xl w-full max-h-[232px] min-h-[232px] min-w-full border-b border-gray-200'
						// width={500}
						// height={100}
					/>
				) : (
					<div className='rounded-2xl w-full max-h-[232px] min-h-[232px] min-w-full flex items-center justify-center border-b border-gray-200'>
						<MdImageNotSupported size={96} />
					</div>
				)}
				<div className='p-3 flex flex-col gap-1 justify-start items-start'>
					<h3 className='text-ellipsis max-w-full line-clamp-1'>
						{news.title}
					</h3>
					<p className='line-clamp-3'>{stripHtml(news.content)}</p>
				</div>
			</article>
		</Link>
	);
};
