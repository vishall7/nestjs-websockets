import z from 'zod';

export const createUserSchema = z.object({
  name: z.string().nonempty().trim(),
  age: z.number(),
  designation: z.string().trim(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
