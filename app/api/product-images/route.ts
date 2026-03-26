import { createContentImageHandler } from '@/shared/lib/createContentImageHandler';
import { deleteContentImageHandler } from '@/shared/lib/deleteContentImageHandler';

export const POST = createContentImageHandler('product-images', 'ADMIN');
export const DELETE = deleteContentImageHandler('product-images', 'ADMIN');
