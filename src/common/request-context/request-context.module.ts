import { Module } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Request } from 'express';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (request: Request) => {
          const existingId = request.headers['x-request-id'];

          if (existingId && typeof existingId === 'string') {
            return existingId;
          }

          return randomUUID();
        },
      },
    }),
  ],
})
export class RequestContextModule {}
