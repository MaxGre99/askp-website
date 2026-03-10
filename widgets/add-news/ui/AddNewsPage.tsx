import { CreateNewsForm } from '@/features/create-news';

export const AddNewsPage = () => {
	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>Добавить новость</h1>
			<CreateNewsForm />
		</div>
	);
};
