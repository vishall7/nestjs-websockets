import z from 'zod';
import { sessionStatus } from '../../database/schema/sessions';

export const sessionResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  joinCode: z.string(),
  status: z.enum(sessionStatus.enumValues),
  createdBy: z.uuid(),
  createdAt: z.date(),
  expiresAt: z.date().nullable(),
});

export const sessionListResponseSchema = z.array(sessionResponseSchema);

/** Mutations: client can GET by id for full session. */
export const sessionIdResponseSchema = z.object({
  id: z.uuid(),
});

export type SessionResponseDto = z.infer<typeof sessionResponseSchema>;
export type SessionIdResponseDto = z.infer<typeof sessionIdResponseSchema>;
