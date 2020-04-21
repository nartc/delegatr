import { dbConfiguration, redisConfiguration } from '@delegatr/shared-config';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { arenaConfiguration } from './arena.configuration';
import { sgConfiguration } from './sg.configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        redisConfiguration,
        arenaConfiguration,
        sgConfiguration,
        dbConfiguration,
      ],
    }),
  ],
  exports: [ConfigModule],
})
export class BackgroundConfigModule {}
