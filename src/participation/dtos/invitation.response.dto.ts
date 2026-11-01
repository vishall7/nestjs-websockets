import z from 'zod';
import { memberStatus } from '../../database/schema/sessionMembers';

export const invitationResponseSchema = z.object({
  id: z.uuid(),
  sessionId: z.uuid(),
  userId: z.uuid(),
  status: z.enum(memberStatus.enumValues),
  invitedAt: z.date(),
});
