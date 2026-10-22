import z from 'zod';

export const createSessionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  durationMinutes: z.number().int().min(1).max(15),
});

export const updateSessionSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
});

export type CreateSessionDto = z.infer<typeof createSessionSchema>;
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
