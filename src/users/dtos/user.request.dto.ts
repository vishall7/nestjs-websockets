import z from 'zod';
import { UsersUpdateSchema } from '../users.schema';

export const updateUserSchema = UsersUpdateSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
