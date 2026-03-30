'use client';

import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';

interface Props {
	isEditing: boolean;
	setIsEditing: (v: boolean) => void;
}

export const ProfileActions = ({ isEditing, setIsEditing }: Props) => {
	const { t } = useTranslation();

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
						{t('buttons.cancel')}
					</Button>

					<Button type='submit' disabled={isSubmitting || !dirty}>
						{isSubmitting ? t('buttons.saving') : t('buttons.save')}
					</Button>
				</>
			) : (
				<Button type='button' onClick={() => setIsEditing(true)}>
					{t('buttons.editProfile')}
				</Button>
			)}
		</div>
	);
};
