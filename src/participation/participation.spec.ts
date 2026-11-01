/* eslint-disable */
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  RequestMethod,
} from '@nestjs/common';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';
import type { Database } from '../database/database.types';
import { InvitationsController } from './invitations.controller';
import { ParticipationService } from './participation.service';

describe('ParticipationService', () => {
  const session = { id: 'session-id', status: 'draft' as const };
  const user = { id: 'user-id' };
  let findOne: jest.Mock;
  let findByEmail: jest.Mock;
  let findMembership: jest.Mock;
  let insert: jest.Mock;
  let service: ParticipationService;

  beforeEach(() => {
    findOne = jest.fn().mockResolvedValue(session);
    findByEmail = jest.fn().mockResolvedValue(user);
    findMembership = jest.fn().mockResolvedValue(undefined);
    insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([
          {
            id: 'membership-id',
            sessionId: session.id,
            userId: user.id,
            status: 'invited',
            invitedAt: new Date(),
          },
        ]),
      }),
    });

    const db = {
      query: { sessionMembers: { findFirst: findMembership } },
      insert,
    } as unknown as Database;

    service = new ParticipationService(
      db,
      { findByEmail } as never,
      { findOne } as never,
    );
  });

  it('exposes invitations under the sessions resource', () => {
    expect(Reflect.getMetadata(PATH_METADATA, InvitationsController)).toBe(
      'sessions/:sessionId/invitations',
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
  });

  it('creates an invited membership for a registered user', async () => {
    await expect(
      service.inviteUser('host-id', session.id, 'user@example.com'),
    ).resolves.toMatchObject({
      sessionId: session.id,
      userId: user.id,
      status: 'invited',
    });

    expect(findOne).toHaveBeenCalledWith('host-id', session.id);
    expect(findByEmail).toHaveBeenCalledWith('user@example.com');
    expect(insert).toHaveBeenCalled();
  });

  it('rejects users who are not registered', async () => {
    findByEmail.mockResolvedValue(undefined);

    await expect(
      service.inviteUser('host-id', session.id, 'missing@example.com'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('rejects non-draft sessions', async () => {
    findOne.mockResolvedValue({ ...session, status: 'lobby' });

    await expect(
      service.inviteUser('host-id', session.id, 'user@example.com'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects duplicate memberships', async () => {
    findMembership.mockResolvedValue({ id: 'existing-membership' });

    await expect(
      service.inviteUser('host-id', session.id, 'user@example.com'),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
