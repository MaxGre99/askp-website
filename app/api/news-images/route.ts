import { createContentImageHandler } from '@/shared/lib/createContentImageHandler';
import { deleteContentImageHandler } from '@/shared/lib/deleteContentImageHandler';

export const POST = createContentImageHandler('news-images', 'ADMIN');

export const DELETE = deleteContentImageHandler('news-images', 'ADMIN');
