import { Module, StandardSchemaSerializerInterceptor } from '@nestjs/common';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from './common/interceptors';
import { APP_INTERCEPTOR, APP_GUARD, APP_PIPE } from '@nestjs/core/constants';
import { JwtAuthGuard } from './common/guards';
import { ValidationPipe } from './common/pipes';
import { RequestContextModule } from './common/request-context/request-context.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/configuration.module';
import { SessionManagementModule } from './session-management/session-management.module';

@Module({
  imports: [
    ConfigurationModule,
    RequestContextModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    SessionManagementModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: StandardSchemaSerializerInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
