import z from 'zod';

export const jwtPayloadSchema = z.object({
  sub: z.uuid(),
  email: z.email(),
  role: z.enum(['admin', 'standard']),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
