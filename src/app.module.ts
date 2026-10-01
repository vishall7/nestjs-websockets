import {
  BadRequestException,
  HttpStatus,
  Module,
  StandardSchemaValidationPipe,
  StandardSchemaSerializerInterceptor,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './common/interceptors';
import { APP_INTERCEPTOR, APP_GUARD, APP_PIPE } from '@nestjs/core/constants';
import { DummyGuard } from './common/guards';
import { ClsModule } from 'nestjs-cls';
import type { Request } from 'express';
import { randomUUID } from 'crypto';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => {
          const existingId = req.headers['x-request-id'];
          if (existingId && typeof existingId === 'string') {
            return existingId;
          }
          const requestId = randomUUID();
          return requestId;
        },
      },
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: StandardSchemaSerializerInterceptor },
    { provide: APP_GUARD, useClass: DummyGuard },
    {
      provide: APP_PIPE,
      useValue: new StandardSchemaValidationPipe({
        exceptionFactory: (issues) => {
          return new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Validation Error',
            issues,
          });
        },
      }),
    },
  ],
})
export class AppModule {}
