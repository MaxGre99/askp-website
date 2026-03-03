import Image from 'next/image';
import Link from 'next/link';

interface NewsCard {
	article: {
		title: string;
		content: string;
		slug: string;
	};
	type: string;
}

export const NewsCard = ({ article, type }: NewsCard) => {
	return (
		<Link href={`/${type}/${article.slug}`}>
			<article className='bg-white/70 backdrop-blur-2xl flex flex-col gap-1 rounded-2xl'>
				<Image
					src={'/mockNews.webp'}
					alt='news-cover'
					className='rounded-2xl w-full'
					width={500}
					height={100}
				/>
				<div className='p-3 flex flex-col gap-1 justify-start items-start font-inter'>
					<h3 className='text-ellipsis max-w-full line-clamp-1'>
						{article.title}
					</h3>
					<p className='line-clamp-3 font-inter'>{article.content}</p>
				</div>
			</article>
		</Link>
	);
};
