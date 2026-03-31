import { StylesConfig } from 'react-select';

export const reactSelectStyles: StylesConfig = {
	control: (base) => ({
		...base,
		borderRadius: '1rem',
		minHeight: '40px',
	}),

	menu: (base) => ({
		...base,
		borderRadius: '1rem',
		overflow: 'hidden',
	}),

	menuList: (base) => ({
		...base,
		borderRadius: '1rem',
		padding: 0,
	}),

	option: (base, state) => ({
		...base,
		backgroundColor: /* state.isSelected
			? '#e5e7eb' // выбранный
			: */ state.isFocused
			? '#f3f4f6' // hover
			: 'white',

		color: '#111827',
		cursor: 'pointer',

		// 🔥 убираем синий active
		':active': {
			backgroundColor: '#e5e7eb',
		},
	}),

	// indicatorSeparator: () => ({
	// 	display: 'none',
	// }),
};
