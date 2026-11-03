import z from 'zod';
import { memberStatus } from '../../database/schema/sessionMembers';

const invitationStatusValues = memberStatus.enumValues.filter(
  (status) =>
    status === 'invited' || status === 'accepted' || status === 'declined',
) as ['invited', 'accepted', 'declined'];

export const invitationStatusSchema = z.enum(invitationStatusValues);

export const invitationQuerySchema = z.object({
  status: invitationStatusSchema.optional(),
});

export type InvitationQueryDto = z.infer<typeof invitationQuerySchema>;

export const inviteUserSchema = z.object({
  sessionId: z.uuid(),
  inviteeUserId: z.uuid(),
});

export type InviteUserDto = z.infer<typeof inviteUserSchema>;
