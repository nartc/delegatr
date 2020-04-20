import { ApiUserRepositoryModule } from '@delegatr/api-user-repository';
import { queueProviderFactory } from '@delegatr/background-common';
import { redisConfiguration } from '@delegatr/shared-config';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BackgroundUserQueueConsumer } from './background-user-queue';
import { userQueueName } from './background-user-queue.constant';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: userQueueName,
      useFactory: queueProviderFactory(userQueueName),
    }),
    ApiUserRepositoryModule,
  ],
  providers: [BackgroundUserQueueConsumer],
  exports: [BullModule],
})
export class BackgroundUserQueueModule {}
