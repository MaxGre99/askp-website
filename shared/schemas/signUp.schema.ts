import { z } from 'zod';

const SignUpSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

export default SignUpSchema;
