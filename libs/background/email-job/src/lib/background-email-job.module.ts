import { redisConfiguration } from '@delegatr/api/config';
import { ApiEmailModule } from '@delegatr/api/email';
import {
  emailQueueName,
  queueProviderFactory,
} from '@delegatr/background/common';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailJobConsumer } from './email-job.consumer';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: emailQueueName,
      useFactory: queueProviderFactory(emailQueueName),
    }),
    ApiEmailModule,
  ],
  providers: [EmailJobConsumer],
})
export class BackgroundEmailJobModule {}
