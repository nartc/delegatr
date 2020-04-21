import { BackgroundConfigModule } from '@delegatr/background-config';
import { BackgroundRoleQueueModule } from '@delegatr/background-role-queue';
import { BackgroundUserQueueModule } from '@delegatr/background-user-queue';
import { SharedDbModule } from '@delegatr/shared-db';
import { Module } from '@nestjs/common';
import { RoleBackgroundController } from './controllers/role-background.controller';
import { UserBackgroundController } from './controllers/user-background.controller';

@Module({
  imports: [
    BackgroundConfigModule,
    SharedDbModule,
    BackgroundUserQueueModule,
    BackgroundRoleQueueModule,
  ],
  controllers: [UserBackgroundController, RoleBackgroundController],
})
export class AppModule {}
