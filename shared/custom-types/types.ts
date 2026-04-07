export interface AuthorWithProfile {
	firstName: string;
	lastName: string;
	profile?: { displayName?: string | null } | null;
}
