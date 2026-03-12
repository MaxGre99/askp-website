export interface AuthorWithProfile {
	firstName: string;
	lastName: string;
	profile?: { displayName?: string | null } | null;
}

export const getAuthorName = (author: AuthorWithProfile): string => {
	return (
		author.profile?.displayName ?? `${author.firstName} ${author.lastName}`
	);
};
