import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  driver: 'pglite',
  dbCredentials: { url: './data' },
  schema: './src/database/schema/index.ts',
  out: './drizzle',
});
