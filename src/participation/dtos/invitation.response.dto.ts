import z from 'zod';
import { memberStatus } from '../../database/schema/sessionMembers';
import { sessionStatus } from '../../database/schema/sessions';

export const invitationResponseSchema = z.object({
  id: z.uuid(),
  sessionId: z.uuid(),
  userId: z.uuid(),
  status: z.enum(memberStatus.enumValues),
  invitedAt: z.date(),
});

const invitationSessionResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  status: z.enum(sessionStatus.enumValues),
});

export const invitationWithSessionResponseSchema = z.object({
  id: z.uuid(),
  status: z.enum(memberStatus.enumValues),
  invitedAt: z.date(),
  respondedAt: z.date().nullable(),
  session: invitationSessionResponseSchema,
});

export const invitationsResponseSchema = z.array(
  invitationWithSessionResponseSchema,
);
