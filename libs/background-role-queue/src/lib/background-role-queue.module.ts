import { ApiRoleRepositoryModule } from '@delegatr/api-role-repository';
import { queueProviderFactory } from '@delegatr/background-common';
import { redisConfiguration } from '@delegatr/shared-config';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BackgroundRoleQueueConsumer } from './background-role-queue';
import { roleQueueName } from './background-role-queue.constant';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: roleQueueName,
      useFactory: queueProviderFactory(roleQueueName),
    }),
    ApiRoleRepositoryModule,
  ],
  providers: [BackgroundRoleQueueConsumer],
  exports: [BullModule],
})
export class BackgroundRoleQueueModule {}
