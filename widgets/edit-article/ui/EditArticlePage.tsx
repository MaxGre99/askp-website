import { EditArticleForm } from '@/features/article-form';

export const EditArticlePage = () => {
	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>Редактировать статью</h1>
			<EditArticleForm />
		</div>
	);
};
