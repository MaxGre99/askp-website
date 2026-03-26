import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useGetMeQuery } from '@/entities/users';

import { redirectWithToast } from '../lib/redirectWithToast';

export const useAuthorGuard = (authorId?: string) => {
	const router = useRouter();
	const { data: user, isLoading } = useGetMeQuery();

	const isReady = !isLoading && !!authorId;
	const isOwner = user?.role === 'OWNER' || user?.role === 'ADMIN';
	const isAuthor = user?.id === authorId;
	const isForbidden = isReady && !isOwner && !isAuthor;

	useEffect(() => {
		if (isForbidden) {
			redirectWithToast(
				router,
				'/account/my-articles',
				'Недостаточно прав доступа',
			);
		}
	}, [isForbidden, router]);

	return { isForbidden, isLoading: isLoading || !isReady };
};
