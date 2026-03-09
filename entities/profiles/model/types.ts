export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type MaritalStatus = 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';
export type PhoneRefs = 'CALL' | 'WHATSAPP' | 'TELEGRAM';

export interface Profile {
	userId: string;
	firstName: string | null;
	lastName: string | null;
	middleName: string | null;
	displayName: string | null;
	city: string | null;
	gender: Gender | null;
	languages: string[];
	maritalStatus: MaritalStatus | null;
	birthDate: string | null;
	shortBio: string | null;
	fullBio: string | null;
	phone: string | null;
	telegramUser: string | null;
	telegramChannel: string | null;
	vkUrl: string | null;
	website: string | null;
	phoneRefs: PhoneRefs[] | null;
}
