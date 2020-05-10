import { redisConfiguration } from '@delegatr/api/config';
import { ApiUserModule } from '@delegatr/api/user';
import { queueProviderFactory } from '@delegatr/background/common';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { userQueueName } from './user-job.constant';
import { UserJobConsumer } from './user-job.consumer';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: userQueueName,
      useFactory: queueProviderFactory(userQueueName),
    }),
    ApiUserModule,
  ],
  providers: [UserJobConsumer],
})
export class BackgroundUserJobModule {}
