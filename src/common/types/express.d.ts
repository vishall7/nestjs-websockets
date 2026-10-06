import type { AuthenticatedUser } from './authenticated-user.types';

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
}

export {};
