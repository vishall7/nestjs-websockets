import type { PgliteDatabase } from 'drizzle-orm/pglite';
import type { relations } from './schema/relations';

export type Database = PgliteDatabase<typeof relations>;
