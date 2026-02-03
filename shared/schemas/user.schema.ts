import { z } from 'zod';

export const UserRoleSchema = z.enum(['OWNER', 'ADMIN', 'USER']);

const UserSchema = z.object({
	id: z.uuid(),
	email: z.email(),

	firstName: z.string().min(1),
	lastName: z.string().min(1),

	photo: z.url().nullable().optional(),

	role: UserRoleSchema,
});

export type User = z.infer<typeof UserSchema>;

export default UserSchema;
