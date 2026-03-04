'use client';

import { useFormikContext } from 'formik';

import { BaseButton } from '@/shared/ui/BaseButton';

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
					<BaseButton
						type='button'
						onClick={() => {
							resetForm();
							setIsEditing(false);
						}}
						disabled={isSubmitting}
					>
						Отмена
					</BaseButton>

					<BaseButton type='submit' disabled={isSubmitting || !dirty}>
						{isSubmitting ? 'Сохраняем...' : 'Сохранить'}
					</BaseButton>
				</>
			) : (
				<BaseButton type='button' onClick={() => setIsEditing(true)}>
					Редактировать профиль
				</BaseButton>
			)}
		</div>
	);
};
