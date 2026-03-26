import { createContentImageHandler } from '@/shared/lib/createContentImageHandler';
import { deleteContentImageHandler } from '@/shared/lib/deleteContentImageHandler';

export const POST = createContentImageHandler('event-covers', 'ADMIN');

export const DELETE = deleteContentImageHandler('event-covers', 'ADMIN');
