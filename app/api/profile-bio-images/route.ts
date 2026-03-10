import { createContentImageHandler } from '@/shared/lib/createContentImageHandler';
import { deleteContentImageHandler } from '@/shared/lib/deleteContentImageHandler';

export const POST = createContentImageHandler('profile-bio-images');

export const DELETE = deleteContentImageHandler('profile-bio-images');
