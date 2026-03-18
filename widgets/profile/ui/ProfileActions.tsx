'use client';

import { useFormikContext } from 'formik';

import { Button } from '@/shared/ui/Button';

interface Props {
	isEditing: boolean;
	setIsEditing: (v: boolean) => void;
}

export const ProfileActions = ({ isEditing, setIsEditing }: Props) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { isSubmitting, dirty, resetForm } = useFormikContext<any>();

	return (
		<div className='flex justify-end gap-3'>
			{isEditing ? (
				<>
					<Button
						type='button'
						onClick={() => {
							resetForm();
							setIsEditing(false);
						}}
						disabled={isSubmitting}
					>
						Отмена
					</Button>

					<Button type='submit' disabled={isSubmitting || !dirty}>
						{isSubmitting ? 'Сохраняем...' : 'Сохранить'}
					</Button>
				</>
			) : (
				<Button type='button' onClick={() => setIsEditing(true)}>
					Редактировать профиль
				</Button>
			)}
		</div>
	);
};
