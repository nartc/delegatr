import { RedisConfig } from '@delegatr/api/types';
import { BullModuleOptions } from '@nestjs/bull';

export const queueDefaultOptions = {
  defaultJobOptions: {
    attempts: 5,
    timeout: 10000,
  },
};

export const queueProviderFactory = (name: string) => (
  redisConfig: RedisConfig
): BullModuleOptions => ({
  name,
  redis: {
    host: redisConfig.host,
    port: Number(redisConfig.port),
  },
  defaultJobOptions: queueDefaultOptions.defaultJobOptions,
});

export const roleQueueName = 'roleQueue';
export const userQueueName = 'userQueue';
export const emailQueueName = 'emailQueue';

export const queueNames = [roleQueueName, userQueueName, emailQueueName];
