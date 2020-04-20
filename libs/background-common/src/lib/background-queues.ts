import { redisConfiguration } from '@delegatr/shared-config';
import { BullModuleOptions } from '@nestjs/bull/dist/interfaces/bull-module-options.interface';
import { ConfigType } from '@nestjs/config';

export const queueDefaultOptions = {
  defaultJobOptions: {
    attempts: 5,
    timeout: 10000,
  },
};

export const queues = ['userQueue', 'roleQueue', 'emailQueue'].map((queue) => ({
  name: queue,
  options: queueDefaultOptions,
}));

export const queueProviderFactory = (name: string) => (
  redisConfig: ConfigType<typeof redisConfiguration>
): BullModuleOptions => ({
  name,
  redis: {
    host: redisConfig.host,
    port: Number(redisConfig.port),
  },
  defaultJobOptions: queueDefaultOptions.defaultJobOptions,
});
