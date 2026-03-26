import { createContentImageHandler } from '@/shared/lib/createContentImageHandler';
import { deleteContentImageHandler } from '@/shared/lib/deleteContentImageHandler';

export const POST = createContentImageHandler('donater-covers', 'ADMIN');

export const DELETE = deleteContentImageHandler('donater-covers', 'ADMIN');
