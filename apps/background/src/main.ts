/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { queues } from '@delegatr/background-common';
import { arenaConfiguration } from '@delegatr/background-config';
import { redisConfiguration } from '@delegatr/shared-config';
import { Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

const Arena = require('bull-arena');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('BackgroundService');

  const redisConfig = app.get<ConfigType<typeof redisConfiguration>>(
    redisConfiguration.KEY
  );
  const arenaConfig = app.get<ConfigType<typeof arenaConfiguration>>(
    arenaConfiguration.KEY
  );

  const arena = Arena(
    {
      queues: queues.map((q) => ({
        name: q.name,
        hostId: q.name,
        redis: { host: redisConfig.host, port: redisConfig.port },
        type: 'bull',
      })),
    },
    arenaConfig
  );
  app.use('/arena', arena);
  logger.debug('Arena Dashboard enabled');

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
