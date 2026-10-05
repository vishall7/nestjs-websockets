import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SessionManagementController } from './session-management.controller';
import { SessionManagementService } from './session-management.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionManagementController],
  providers: [SessionManagementService],
})
export class SessionManagementModule {}
