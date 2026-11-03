/* eslint-disable */
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  RequestMethod,
} from '@nestjs/common';
import {
  PATH_METADATA,
  METHOD_METADATA,
  GUARDS_METADATA,
} from '@nestjs/common/constants';
import type { Database } from '../database/database.types';
import { invitationQuerySchema } from './dtos/invitation.request.dto';
import { InvitationsController } from './invitations.controller';
import { ParticipationService } from './participation.service';

describe('ParticipationService', () => {
  const session = { id: 'session-id', status: 'draft' as const };
  const inviteeUserId = 'user-id';
  let findOne: jest.Mock;
  let userExists: jest.Mock;
  let findMembership: jest.Mock;
  let findMemberships: jest.Mock;
  let insert: jest.Mock;
  let service: ParticipationService;

  beforeEach(() => {
    findOne = jest.fn().mockResolvedValue(session);
    userExists = jest.fn().mockResolvedValue(true);
    findMembership = jest.fn().mockResolvedValue(undefined);
    findMemberships = jest.fn().mockResolvedValue([]);
    insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([
          {
            id: 'membership-id',
            sessionId: session.id,
            userId: inviteeUserId,
            status: 'invited',
            invitedAt: new Date(),
          },
        ]),
      }),
    });

    const db = {
      query: {
        sessionMembers: {
          findFirst: findMembership,
          findMany: findMemberships,
        },
      },
      insert,
    } as unknown as Database;

    service = new ParticipationService(
      db,
      { userExists } as never,
      { findOne } as never,
    );
  });

  it('exposes the invitation resource routes', () => {
    expect(Reflect.getMetadata(PATH_METADATA, InvitationsController)).toBe(
      'invitations',
    );
    expect(
      Reflect.getMetadata(
        PATH_METADATA,
        InvitationsController.prototype.inviteUser,
      ),
    ).toBe('/');
    expect(
      Reflect.getMetadata(
        METHOD_METADATA,
        InvitationsController.prototype.inviteUser,
      ),
    ).toBe(RequestMethod.POST);
    expect(
      Reflect.getMetadata(
        METHOD_METADATA,
        InvitationsController.prototype.findOwn,
      ),
    ).toBe(RequestMethod.GET);
    expect(
      Reflect.getMetadata(
        GUARDS_METADATA,
        InvitationsController.prototype.findOwn,
      ),
    ).toBeUndefined();
  });

  it('validates the optional status query against member statuses', () => {
    expect(invitationQuerySchema.safeParse({ status: 'accepted' }).success).toBe(
      true,
    );
    expect(invitationQuerySchema.safeParse({ status: 'declined' }).success).toBe(
      true,
    );
    expect(invitationQuerySchema.safeParse({ status: 'joined' }).success).toBe(
      false,
    );
    expect(invitationQuerySchema.safeParse({ status: 'unknown' }).success).toBe(
      false,
    );
    expect(invitationQuerySchema.safeParse({}).success).toBe(true);
  });

  it('filters the current user\'s memberships by status', async () => {
    await service.findUserInvitations(inviteeUserId, 'accepted');

    expect(findMemberships).toHaveBeenCalledWith({
      where: {
        userId: { eq: inviteeUserId },
        status: { eq: 'accepted' },
      },
      with: { session: true },
    });
  });

  it('returns only the current user\'s memberships with their sessions', async () => {
    const invitations = [
      ...(['invited', 'accepted', 'declined'] as const).map((status) => ({
        id: `membership-${status}`,
        sessionId: session.id,
        userId: inviteeUserId,
        status,
        invitedAt: new Date(),
        respondedAt: status === 'invited' ? null : new Date(),
        session: {
          id: session.id,
          name: 'Trivia night',
          joinCode: 'TRIVIA01',
          status: 'draft',
        },
      })),
    ];
    findMemberships.mockResolvedValue(invitations);

    await expect(service.findUserInvitations(inviteeUserId)).resolves.toEqual(
      invitations,
    );
    expect(findMemberships).toHaveBeenCalledWith({
      where: { userId: { eq: inviteeUserId } },
      with: { session: true },
    });
  });

  it('creates an invited membership for a registered user', async () => {
    await expect(
      service.inviteUser('host-id', session.id, inviteeUserId),
    ).resolves.toMatchObject({
      sessionId: session.id,
      userId: inviteeUserId,
      status: 'invited',
    });

    expect(findOne).toHaveBeenCalledWith('host-id', session.id);
    expect(userExists).toHaveBeenCalledWith(inviteeUserId);
    expect(insert).toHaveBeenCalled();
  });

  it('rejects users who are not registered', async () => {
    userExists.mockResolvedValue(false);

    await expect(
      service.inviteUser('host-id', session.id, inviteeUserId),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('rejects requests from users who do not own the session', async () => {
    findOne.mockRejectedValue(new NotFoundException('Session not found'));

    await expect(
      service.inviteUser('host-id', session.id, inviteeUserId),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('rejects non-draft sessions', async () => {
    findOne.mockResolvedValue({ ...session, status: 'lobby' });

    await expect(
      service.inviteUser('host-id', session.id, inviteeUserId),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects duplicate memberships', async () => {
    findMembership.mockResolvedValue({ id: 'existing-membership' });

    await expect(
      service.inviteUser('host-id', session.id, inviteeUserId),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
