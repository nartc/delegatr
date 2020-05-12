import { redisConfiguration } from '@delegatr/api/config';
import { ApiUserModule } from '@delegatr/api/user';
import { queueProviderFactory, userQueueName } from '@delegatr/background/common';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
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
