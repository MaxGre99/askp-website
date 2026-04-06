// widgets/account-sidebar/ui/AccountSidebarSelect.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import Select, { SingleValue } from 'react-select';

import { useGetMeQuery } from '@/entities/users';
import { getReactSelectStyles } from '@/shared/lib/getReactSelectStyles';

import { accountSidebarConfig } from '../model/sidebar-config';

type Option = {
	label: string;
	value: string;
	icon: React.ElementType;
};

export const AccountSidebarSelect = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const { data: user } = useGetMeQuery();
	const groups = Object.values(accountSidebarConfig);

	const options: Option[] = groups.flatMap((group) =>
		group
			.filter(({ access }) => access.includes(user?.role || 'USER'))
			.map(({ title, href, icon }) => ({
				label: t(`sidebar.${title}`),
				value: `/account/${href}`,
				icon,
			})),
	);

	const current = options.find((o) => pathname.startsWith(o.value)) ?? null;

	const formatOption = ({ label, icon: Icon }: Option) => (
		<div className='flex items-center gap-2'>
			<Icon size={18} className='shrink-0' />
			<span>{label}</span>
		</div>
	);

	return (
		<Select<Option>
			options={options}
			value={current}
			onChange={(opt: SingleValue<Option>) => opt && router.push(opt.value)}
			formatOptionLabel={formatOption}
			styles={{
				...getReactSelectStyles<Option>(),
				control: (base) => ({
					...base,
					borderRadius: '1rem',
					minHeight: '56px', // или любое нужное значение
					padding: '4px 4px',
				}),
			}}
			isSearchable={false}
			className='w-full'
			placeholder={t('placeholders.selectTheTab')}
		/>
	);
};
