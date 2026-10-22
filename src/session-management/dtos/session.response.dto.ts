import z from 'zod';

export const sessionResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  joinCode: z.string(),
  durationMinutes: z.number().int(),
  status: z.enum(['draft', 'open', 'lobby', 'active', 'finished']),
  createdBy: z.uuid(),
  createdAt: z.date(),
});

export const sessionListResponseSchema = z.array(sessionResponseSchema);

/** Mutations: client can GET by id for full session. */
export const sessionIdResponseSchema = z.object({
  id: z.uuid(),
});

export type SessionResponseDto = z.infer<typeof sessionResponseSchema>;
export type SessionIdResponseDto = z.infer<typeof sessionIdResponseSchema>;
