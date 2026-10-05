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

export type SessionResponseDto = z.infer<typeof sessionResponseSchema>;
