import { useState } from 'react';

type ConfirmType = 'confirm' | 'delete';

export const useConfirm = () => {
	const [state, setState] = useState<{
		isOpen: boolean;
		title: string;
		onConfirm: () => void;
		type?: ConfirmType;
	}>({ isOpen: false, title: '', onConfirm: () => {}, type: 'confirm' });

	const confirm = (
		title: string,
		onConfirm: () => void,
		type: ConfirmType = 'confirm',
	) => {
		setState({ isOpen: true, title, onConfirm, type });
	};

	const handleConfirm = () => {
		state.onConfirm();
		setState((s) => ({ ...s, isOpen: false }));
	};

	const handleCancel = () => {
		setState((s) => ({ ...s, isOpen: false }));
	};

	return {
		confirmProps: {
			isOpen: state.isOpen,
			title: state.title,
			onConfirm: handleConfirm,
			onCancel: handleCancel,
			type: state.type,
		},
		confirm,
	};
};
