import {
  Injectable,
  Module,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import { DATABASE_CONNECTION } from './database.constants';
import type { Database } from './database.types';
import { relations } from './schema/relations';

@Injectable()
class DatabaseClient implements OnModuleInit, OnApplicationShutdown {
  private readonly client = new PGlite('./data');
  readonly ready = this.client.waitReady;
  readonly db: Database = drizzle({ client: this.client, relations });

  async onModuleInit() {
    await this.ready;
  }

  async onApplicationShutdown() {
    await this.client.close();
  }
}

@Module({
  providers: [
    DatabaseClient,
    {
      provide: DATABASE_CONNECTION,
      inject: [DatabaseClient],
      useFactory: async (databaseClient: DatabaseClient): Promise<Database> => {
        await databaseClient.ready;
        return databaseClient.db;
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
