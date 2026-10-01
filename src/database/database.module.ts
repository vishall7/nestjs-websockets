import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import { DATABASE_CONNECTION } from './database.constants';
import type { Database } from './database.types';
import { relations } from './schema/relations';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: async (): Promise<Database> => {
        const client = new PGlite('./data');
        await client.waitReady;
        return drizzle({ client, relations });
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
