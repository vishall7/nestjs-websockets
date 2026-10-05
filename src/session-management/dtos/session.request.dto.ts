import z from 'zod';

export const createSessionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  durationMinutes: z.number().int().positive().max(180),
});

export const updateSessionSchema = createSessionSchema.partial();

export type CreateSessionDto = z.infer<typeof createSessionSchema>;
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
