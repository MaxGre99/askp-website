import { GroupBase, StylesConfig } from 'react-select';

export function getReactSelectStyles<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
>(): StylesConfig<Option, IsMulti, Group> {
	return {
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
			backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
			color: '#111827',
			cursor: 'pointer',
			':active': {
				backgroundColor: '#e5e7eb',
			},
		}),
	};
}
