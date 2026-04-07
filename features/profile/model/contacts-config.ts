import { IconType } from 'react-icons';
import { FaGlobe, FaPhone, FaTelegram, FaVk, FaWhatsapp } from 'react-icons/fa';

import { Profile } from '@/entities/profiles';

type ContactAction = 'tel' | 'href';

interface ContactConfig {
	key: keyof Profile;
	icon: IconType;
	action: ContactAction;
	getHref: (value: string) => string;
}

export const CONTACTS_CONFIG: ContactConfig[] = [
	{
		key: 'phone',
		icon: FaPhone,
		action: 'tel',
		getHref: (v) => `tel:${v}`,
	},
	{
		key: 'telegramUser',
		icon: FaTelegram,
		action: 'href',
		getHref: (v) => `https://t.me/${v.replace('@', '')}`,
	},
	{
		key: 'telegramChannel',
		icon: FaTelegram,
		action: 'href',
		getHref: (v) => v,
	},
	{
		key: 'vkUrl',
		icon: FaVk,
		action: 'href',
		getHref: (v) => v,
	},
	{
		key: 'website',
		icon: FaGlobe,
		action: 'href',
		getHref: (v) => v,
	},
];

const normalizePhone = (phone: string) => phone.replace(/\D/g, '');

export const PHONE_REF_ORDER = ['CALL', 'WHATSAPP', 'TELEGRAM'];

export const PHONE_REF_CONFIG = {
	CALL: {
		label: 'call',
		icon: FaPhone,
		getHref: (phone: string) => `tel:${phone}`,
		action: 'tel' as const,
	},
	WHATSAPP: {
		label: 'whatsapp',
		icon: FaWhatsapp,
		getHref: (phone: string) => `https://wa.me/${normalizePhone(phone)}`,
		action: 'href' as const,
	},
	TELEGRAM: {
		label: 'telegram',
		icon: FaTelegram,
		getHref: (phone: string) => `https://t.me/+${normalizePhone(phone)}`,
		action: 'href' as const,
	},
} satisfies Record<
	string,
	{
		label: string;
		icon: IconType;
		getHref: (phone: string) => string;
		action: 'tel' | 'href';
	}
>;
