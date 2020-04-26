/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { arenaConfiguration } from '@delegatr/background-config';
import { redisConfiguration } from '@delegatr/shared-config';
import { getQueueToken } from '@nestjs/bull';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Queue } from 'bull';
import { setQueues, UI } from 'bull-board';
import { AppModule } from './app/app.module';

function setupQueueDashboard(app: INestApplication, logger: Logger) {
  const queues = ['userQueue', 'roleQueue'].map((queueName) =>
    app.get<Queue>(getQueueToken(queueName))
  );
  setQueues(queues);
  app.use('/admin/bull', UI);
  logger.debug('Bull Dashboard enabled');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('BackgroundService');

  const redisConfig = app.get<ConfigType<typeof redisConfiguration>>(
    redisConfiguration.KEY
  );
  const arenaConfig = app.get<ConfigType<typeof arenaConfiguration>>(
    arenaConfiguration.KEY
  );

  setupQueueDashboard(app, logger);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      url: `redis://${redisConfig.host}:${redisConfig.port}`,
    },
  });

  app.startAllMicroservices(() => {
    logger.debug('Listening');
  });

  await app.listen(arenaConfig.port, () => {
    logger.debug(`Running on ${arenaConfig.port}`);
  });
}

bootstrap();
