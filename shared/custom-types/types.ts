export interface AuthorWithProfile {
	firstName: string;
	lastName: string;
	profile?: { displayName?: string | null } | null;
}

export const MEMBERSHIP_RANK: Record<MembershipLevel, number> = {
	PRESIDENT: 0,
	VICE_PRESIDENT: 1,
	EXPERT: 2,
	SPECIALIST: 3,
	PSYCHOLOGIST_PRACTITIONER: 4,
	BEGINNER_SPECIALIST: 5,
	PARTNER: 6,
	SEEKER: 7,
};

export type MembershipLevel =
	| 'PRESIDENT'
	| 'VICE_PRESIDENT'
	| 'EXPERT'
	| 'SPECIALIST'
	| 'PSYCHOLOGIST_PRACTITIONER'
	| 'BEGINNER_SPECIALIST'
	| 'PARTNER'
	| 'SEEKER';
