import { createContentImageHandler } from '@/shared/lib/createContentImageHandler';
import { deleteContentImageHandler } from '@/shared/lib/deleteContentImageHandler';

export const POST = createContentImageHandler('article-covers');

export const DELETE = deleteContentImageHandler('article-covers');
