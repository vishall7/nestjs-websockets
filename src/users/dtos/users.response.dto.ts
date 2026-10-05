import z from 'zod';
import { UsersSelectSchema } from '../users.schema';

export const userResponseSchema = UsersSelectSchema.omit({
  passwordHash: true,
});

export type UserResponseDto = z.infer<typeof userResponseSchema>;
