import type { UserRole } from '../../database/schema/users';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: UserRole;
    }
  }
}

export {};
