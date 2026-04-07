import { AuthorWithProfile } from '@/shared/custom-types/types';

export const getAuthorName = (author: AuthorWithProfile): string => {
	return author.profile?.displayName && author.profile.displayName !== ''
		? author.profile?.displayName
		: `${author.firstName} ${author.lastName}`;
};
