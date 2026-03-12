import { CreateArticleForm } from '@/features/article-form';

export const AddArticlePage = () => {
	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>Добавить статью</h1>
			<CreateArticleForm />
		</div>
	);
};
