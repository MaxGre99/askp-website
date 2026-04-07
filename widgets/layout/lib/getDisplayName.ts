import { Profile } from '@/entities/profiles';
import { User } from '@/entities/users';

export const getDisplayName = (
	profile?: Partial<Profile> | null,
	user?: User | null,
): string => {
	if (profile?.displayName) return profile.displayName;
	const firstName = profile?.firstName || user?.firstName || '';
	const lastName = profile?.lastName || user?.lastName || '';
	return [firstName, lastName].filter(Boolean).join(' ') || '—';
};
