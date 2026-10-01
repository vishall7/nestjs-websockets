import { createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import { users } from '../database/schema';

export const UsersSelectSchema = createSelectSchema(users);
export const UsersUpdateSchema = createUpdateSchema(users);
