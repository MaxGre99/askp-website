import { EditNewsForm } from '@/features/news-form/ui/EditNewsForm';

export const EditNewsPage = () => {
	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>Редактировать новость</h1>
			<EditNewsForm />
		</div>
	);
};
