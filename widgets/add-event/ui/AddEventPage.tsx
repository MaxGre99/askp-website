import { CreateEventForm } from '@/features/event-form';

export const AddEventPage = () => {
	return (
		<div className='flex flex-col gap-6 flex-1 w-full'>
			<h1 className='text-2xl font-bold'>Добавить событие</h1>
			<CreateEventForm />
		</div>
	);
};
