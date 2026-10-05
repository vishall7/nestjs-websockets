import type { UserRole } from '../../database/schema/users';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}
