export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type MaritalStatus = 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';

export interface Profile {
	firstName: string | null;
	lastName: string | null;
	middleName: string | null;
	displayName: string | null;
	gender: Gender | null;
	languages: string[];
	maritalStatus: MaritalStatus | null;
	birthDate: string | null;
	shortBio: string | null;
	fullBio: string | null;
}
